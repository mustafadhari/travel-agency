export default function ContactMap() {
  return (
    <div className="h-64 bg-muted rounded-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.3585237028487!2d73.11294917527759!3d19.223200547334805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7953d15bdefcd%3A0x76cae7aeddaa95f8!2sEASYOURTOUR!5e0!3m2!1sen!2sin!4v1756322231083!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}
