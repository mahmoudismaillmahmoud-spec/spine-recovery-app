// Renders trusted inline SVG markup from spine-data.js without adding a wrapper box.
export default function Svg({ html }) {
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html || '' }} />;
}
