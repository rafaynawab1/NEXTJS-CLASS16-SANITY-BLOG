import config from "../../sanity/config/client-config";
import { Blog } from "../../types/blog"; // Ensure the Blog type is correct
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import Image from "next/image";

import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Define proper types for the components

// Image component props
interface ImageValue {
  alt?: string;
  asset: {
    _ref: string; // Sanity asset reference
  };
  width: number;
  height: number;
}

// Code component props
interface CodeValue {
  language: string;
  code: string;
}

// Table component props
interface TableRow {
  _key: string;
  cells: string[];
}

interface TableValue {
  rows: TableRow[];
}

const ImageComponent = ({ value, isInline }: { value: ImageValue; isInline: boolean }) => {
  const { width, height } = getImageDimensions(value.asset); 
  return (
    <div className="my-10 overflow-hidden rounded-[15px]">
      <Image
        src={
          urlBuilder(config)
            .image(value)
            .fit("max")
            .auto("format")
            .url() as string
        }
        width={width}
        height={height}
        alt={value.alt || "blog image"}
        loading="lazy"
        style={{
          display: isInline ? "inline-block" : "block",
          aspectRatio: width / height,
        }}
      />
    </div>
  );
};

const Code = ({ value }: { value: CodeValue }) => {
  return (
    <div className="my-10">
      <SyntaxHighlighter language={value.language} style={dracula}>
        {value.code}
      </SyntaxHighlighter>
    </div>
  );
};

const Table = ({ value }: { value: TableValue }) => {
  return (
    <div className="my-10">
      <table>
        <tbody>
          {value.rows.map((row) => (
            <tr key={row._key}>
              {row.cells.map((cell, key) => (
                <td key={key} className="first-of-type:bg-gray-100 max-w-[100px]">
                  <span className="px-4">{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: Code,
    table: Table,
  },
};

// Define the RenderBodyContent component with proper typing
const RenderBodyContent = ({ post }: { post: Blog }) => {
  return (
    <>
      <PortableText value={post?.body as PortableTextBlock[]} components={components} />
    </>
  );
};

export default RenderBodyContent;
