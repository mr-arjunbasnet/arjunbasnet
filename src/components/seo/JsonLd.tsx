interface JsonLdProps {
  data: object | object[];
  id?: string;
}

export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escaping `<` as < is required, not defensive: without it a
        // `</script>` anywhere in the serialised data closes the tag early and
        // becomes stored XSS. Harmless today while every input is hand-authored;
        // load-bearing the moment FAQ answers start flowing from the content
        // layer. Prescribed by next/dist/docs/01-app/02-guides/json-ld.md.
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
