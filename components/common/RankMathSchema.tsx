interface RankMathSchemaProps {
  schemas: unknown[];
}

export default function RankMathSchema({ schemas }: RankMathSchemaProps) {
  return schemas.map((schema, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  ));
}
