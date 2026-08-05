"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import Image from "next/image"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Quote,
  Minus,
  Type,
  Undo,
  Redo,
  X,
  Check,
  UploadCloud,
  Loader2,
  Table as TableIcon,
  LayoutList,
} from "lucide-react"

interface WysiwygEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

interface LinkDialogState {
  open: boolean
  url: string
  text: string
}

interface ImageDialogState {
  open: boolean
  url: string
  alt: string
  caption: string
  preview: boolean
}

type ImageTab = "upload" | "url"

export default function WysiwygEditor({ value, onChange, placeholder }: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  const [linkDialog, setLinkDialog] = useState<LinkDialogState>({ open: false, url: "", text: "" })
  const [imageDialog, setImageDialog] = useState<ImageDialogState>({
    open: false,
    url: "",
    alt: "",
    caption: "",
    preview: false,
  })
  const [imageTab, setImageTab] = useState<ImageTab>("upload")
  const [uploading, setUploading] = useState(false)
  const savedRange = useRef<Range | null>(null)

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && isInitialMount.current) {
      editorRef.current.innerHTML = value || ""
      isInitialMount.current = false
    }
  }, [value])

  // Emit changes upward
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  // Save cursor position before opening dialogs
  const saveRange = () => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      savedRange.current = sel.getRangeAt(0).cloneRange()
    }
  }

  // Restore cursor position after dialog closes
  const restoreRange = () => {
    const sel = window.getSelection()
    if (sel && savedRange.current) {
      sel.removeAllRanges()
      sel.addRange(savedRange.current)
    }
  }

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    handleInput()
  }

  const formatBlock = (tag: string) => {
    exec("formatBlock", tag)
  }

  const isActive = (command: string) => {
    try {
      return document.queryCommandState(command)
    } catch {
      return false
    }
  }

  // ── Link insertion ─────────────────────────────────────────────────────────
  const openLinkDialog = () => {
    saveRange()
    const sel = window.getSelection()
    const selectedText = sel ? sel.toString() : ""
    setLinkDialog({ open: true, url: "", text: selectedText })
  }

  const insertLink = () => {
    if (!linkDialog.url) return
    restoreRange()
    editorRef.current?.focus()
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      const a = document.createElement("a")
      a.href = linkDialog.url
      a.target = "_blank"
      a.rel = "noopener noreferrer"
      a.style.color = "#0d9488"
      a.style.textDecoration = "underline"
      a.textContent = linkDialog.text || linkDialog.url
      range.deleteContents()
      range.insertNode(a)
      // Move cursor after link
      range.setStartAfter(a)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
    handleInput()
    setLinkDialog({ open: false, url: "", text: "" })
  }

  // ── Image insertion ────────────────────────────────────────────────────────
  const openImageDialog = () => {
    saveRange()
    setImageDialog({ open: true, url: "", alt: "", caption: "", preview: false })
    setImageTab("upload")
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setImageDialog((d) => ({ ...d, url: data.url, preview: true }))
      } else {
        alert(data.error || "Upload failed")
      }
    } catch (err) {
      console.error(err)
      alert("An error occurred during file upload.")
    } finally {
      setUploading(false)
    }
  }

  const insertImage = () => {
    if (!imageDialog.url) return
    restoreRange()
    editorRef.current?.focus()
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)

      const wrapper = document.createElement("figure")
      wrapper.style.cssText = "margin: 1.5rem 0; text-align: center;"

      const img = document.createElement("img")
      img.src = imageDialog.url
      img.alt = imageDialog.alt || ""
      img.style.cssText = "max-width: 100%; max-height: 480px; object-fit: cover; display: block; margin: 0 auto; border-radius: 12px;"

      wrapper.appendChild(img)

      if (imageDialog.caption) {
        const cap = document.createElement("figcaption")
        cap.textContent = imageDialog.caption
        cap.style.cssText = "padding: 0.5rem 1rem; font-size: 0.85rem; color: #64748b; font-style: italic; text-align: center;"
        wrapper.appendChild(cap)
      }

      // Insert a newline after
      const br = document.createElement("p")
      br.innerHTML = "<br>"

      range.deleteContents()
      range.insertNode(br)
      range.insertNode(wrapper)

      // Move cursor after image block
      range.setStartAfter(br)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
    handleInput()
    setImageDialog({ open: false, url: "", alt: "", caption: "", preview: false })
  }

  // ── Table & TOC insertion ────────────────────────────────────────────────
  const insertTable = () => {
    restoreRange()
    editorRef.current?.focus()
    const tableHTML = `
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr><th>Header 1</th><th>Header 2</th></tr>
        </thead>
        <tbody>
          <tr><td>Data 1</td><td>Data 2</td></tr>
          <tr><td>Data 3</td><td>Data 4</td></tr>
        </tbody>
      </table>
      <p><br></p>
    `
    exec("insertHTML", tableHTML)
  }

  const insertTOC = () => {
    restoreRange()
    editorRef.current?.focus()
    const tocHTML = `
      <div class="toc-box">
        <div class="toc-header">Table of Contents</div>
        <div class="toc-intro">Jump to a section</div>
        <div class="toc-grid">
          <a href="#section-1" class="toc-link">1. Section 1</a>
          <a href="#section-2" class="toc-link">2. Section 2</a>
        </div>
      </div>
      <p><br></p>
    `
    exec("insertHTML", tocHTML)
  }

  const ToolbarButton = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void
    active?: boolean
    title: string
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      title={title}
      className={`p-2 rounded-lg transition-all ${
        active
          ? "bg-teal-600 text-white"
          : "text-slate-400 hover:text-white hover:bg-slate-700"
      }`}
    >
      {children}
    </button>
  )

  const Divider = () => <div className="w-px h-6 bg-slate-700 mx-1" />

  return (
    <div className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-950">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-slate-900 border-b border-slate-700">
        {/* History */}
        <ToolbarButton onClick={() => exec("undo")} title="Undo (Ctrl+Z)">
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("redo")} title="Redo (Ctrl+Y)">
          <Redo className="w-4 h-4" />
        </ToolbarButton>
        <Divider />

        {/* Headings */}
        <ToolbarButton onClick={() => formatBlock("h2")} title="Heading 2">
          <span className="text-xs font-bold">H2</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("h3")} title="Heading 3">
          <span className="text-xs font-bold">H3</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("p")} title="Paragraph">
          <Type className="w-4 h-4" />
        </ToolbarButton>
        <Divider />

        {/* Formatting */}
        <ToolbarButton onClick={() => exec("bold")} active={isActive("bold")} title="Bold (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} active={isActive("italic")} title="Italic (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("underline")} active={isActive("underline")} title="Underline (Ctrl+U)">
          <Underline className="w-4 h-4" />
        </ToolbarButton>
        <Divider />

        {/* Alignment */}
        <ToolbarButton onClick={() => exec("justifyLeft")} title="Align Left">
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyCenter")} title="Align Center">
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyRight")} title="Align Right">
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
        <Divider />

        {/* Lists */}
        <ToolbarButton onClick={() => exec("insertUnorderedList")} title="Bullet List">
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertOrderedList")} title="Numbered List">
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("blockquote")} title="Block Quote">
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertHorizontalRule")} title="Divider">
          <Minus className="w-4 h-4" />
        </ToolbarButton>
        <Divider />

        {/* Link & Image */}
        <ToolbarButton onClick={openLinkDialog} title="Insert Link">
          <Link2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={openImageDialog} title="Insert Image">
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
        <Divider />

        {/* Custom blocks */}
        <ToolbarButton onClick={insertTable} title="Insert Table">
          <TableIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertTOC} title="Insert Table of Contents">
          <LayoutList className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder || "Start writing your article..."}
        className="min-h-[400px] p-6 text-slate-200 outline-none leading-relaxed text-base wysiwyg-content focus:ring-0"
        style={{ caretColor: "#2dd4bf" }}
      />

      {/* ── Link Dialog ────────────────────────────────────────────────────── */}
      {linkDialog.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Link2 className="w-5 h-5 text-teal-400" /> Insert Link
              </h3>
              <button onClick={() => setLinkDialog((d) => ({ ...d, open: false }))} className="text-slate-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Link Text</label>
                <input
                  type="text"
                  placeholder="Click here"
                  value={linkDialog.text}
                  onChange={(e) => setLinkDialog((d) => ({ ...d, text: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">URL</label>
                <input
                  type="url"
                  placeholder="https://"
                  value={linkDialog.url}
                  onChange={(e) => setLinkDialog((d) => ({ ...d, url: e.target.value }))}
                  autoFocus
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setLinkDialog({ open: false, url: "", text: "" })}
                  className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-sm font-medium text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={insertLink}
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-sm font-medium text-white flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Image Dialog ───────────────────────────────────────────────────── */}
      {imageDialog.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-teal-400" /> Insert Image
              </h3>
              <button onClick={() => setImageDialog((d) => ({ ...d, open: false }))} className="text-slate-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dialog Tabs */}
            <div className="flex border-b border-slate-800 mb-4">
              <button
                type="button"
                onClick={() => setImageTab("upload")}
                className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-all ${
                  imageTab === "upload"
                    ? "border-teal-500 text-white"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-all ${
                  imageTab === "url"
                    ? "border-teal-500 text-white"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                Paste Image URL
              </button>
            </div>

            <div className="space-y-4">
              {imageTab === "upload" ? (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Choose Image File</label>
                  <div className="border-2 border-dashed border-slate-700 hover:border-teal-500/50 rounded-xl p-6 text-center cursor-pointer transition-colors relative bg-slate-950">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-2">
                      {uploading ? (
                        <>
                          <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
                          <div className="text-sm text-slate-300 font-medium">Uploading image...</div>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                          <div className="text-sm text-slate-300 font-medium">Click to select image file</div>
                          <div className="text-xs text-slate-500">Supports PNG, JPG, WEBP, GIF</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Image URL *</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={imageDialog.url}
                      autoFocus
                      onChange={(e) => setImageDialog((d) => ({ ...d, url: e.target.value, preview: false }))}
                      className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setImageDialog((d) => ({ ...d, preview: true }))}
                      className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm text-slate-300 whitespace-nowrap"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              )}

              {/* Image preview */}
              {imageDialog.preview && imageDialog.url && (
                <div className="relative h-48 rounded-xl overflow-hidden border border-slate-700 bg-slate-805">
                  <Image
                    src={imageDialog.url}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={() => setImageDialog((d) => ({ ...d, preview: false }))}
                  />
                  <button
                    type="button"
                    onClick={() => setImageDialog((d) => ({ ...d, url: "", preview: false }))}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all shadow"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Alt Text (for accessibility)</label>
                <input
                  type="text"
                  placeholder="Description of the image"
                  value={imageDialog.alt}
                  onChange={(e) => setImageDialog((d) => ({ ...d, alt: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Caption (optional)</label>
                <input
                  type="text"
                  placeholder="A beautiful view from the top..."
                  value={imageDialog.caption}
                  onChange={(e) => setImageDialog((d) => ({ ...d, caption: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setImageDialog({ open: false, url: "", alt: "", caption: "", preview: false })}
                  className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-sm font-medium text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={insertImage}
                  disabled={!imageDialog.url || uploading}
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-sm font-medium text-white flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Insert Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #475569;
          pointer-events: none;
        }
        .wysiwyg-content { font-family: "Lato", "Lato Fallback", sans-serif; }
        .wysiwyg-content h1,
        .wysiwyg-content h2,
        .wysiwyg-content h3 { font-family: "Raleway", "Raleway Fallback", sans-serif; }
        .wysiwyg-content h1 { font-size: 2rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: #f1f5f9; }
        .wysiwyg-content h2 { font-size: 1.5rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: #f1f5f9; border-bottom: 1px solid #334155; padding-bottom: 0.5rem; font-family: "Raleway", "Raleway Fallback", sans-serif; }
        .wysiwyg-content h3 { font-size: 1.2rem; font-weight: 600; margin: 1.25rem 0 0.5rem; color: #e2e8f0; }
        .wysiwyg-content p { margin-bottom: 1rem; }
        .wysiwyg-content ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .wysiwyg-content ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .wysiwyg-content li { margin-bottom: 0.25rem; }
        .wysiwyg-content blockquote { border-left: 4px solid #0d9488; padding: 0.75rem 1rem; margin: 1rem 0; background: rgba(13,148,136,0.08); border-radius: 0 8px 8px 0; color: #94a3b8; font-style: italic; }
        .wysiwyg-content a { color: #2dd4bf; text-decoration: underline; }
        .wysiwyg-content hr { border: none; border-top: 1px solid #334155; margin: 1.5rem 0; }
        .wysiwyg-content figure { margin: 1.5rem 0; }
        .wysiwyg-content img { max-width: 100%; border-radius: 8px; }
        .wysiwyg-content strong { font-weight: 700; color: #f1f5f9; }
        
        /* Table Styles */
        .wysiwyg-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.875rem; overflow-x: auto; display: block; }
        .wysiwyg-content th { background: #0f172a; color: #f1f5f9; padding: 0.75rem 1rem; text-align: left; font-weight: 700; border: 1px solid #334155; font-family: "Raleway", "Raleway Fallback", sans-serif; white-space: nowrap; }
        .wysiwyg-content td { padding: 0.625rem 1rem; border: 1px solid #334155; vertical-align: top; }
        .wysiwyg-content tr:nth-child(even) td { background: rgba(15,23,42,0.4); }
        .wysiwyg-content tr:hover td { background: rgba(30,41,59,0.8); }

        /* TOC Box Styles */
        .wysiwyg-content .toc-box { background: linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(15,23,42,0.6) 100%); border: 1.5px solid #2dd4bf; border-radius: 16px; padding: 1.5rem 1.75rem; margin: 2rem 0 2.5rem; }
        .wysiwyg-content .toc-header { font-family: "Raleway", "Raleway Fallback", sans-serif; font-size: 1.15rem; font-weight: 800; color: #2dd4bf; margin-bottom: 0.4rem; }
        .wysiwyg-content .toc-intro { font-size: 0.9rem; color: #94a3b8; margin-bottom: 1rem; }
        .wysiwyg-content .toc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.6rem; }
        .wysiwyg-content .toc-link { display: block; background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 0.65rem 1rem; font-size: 0.875rem; color: #2dd4bf; font-family: "Lato", "Lato Fallback", sans-serif; font-weight: 600; text-decoration: none; transition: all 0.2s ease; }
        .wysiwyg-content .toc-link:hover { background: #0d9488; color: white; border-color: #2dd4bf; transform: translateY(-1px); }
      `}</style>
    </div>
  )
}
