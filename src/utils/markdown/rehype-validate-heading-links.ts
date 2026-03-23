import { Root } from "hast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { isMarkdownVFile } from "./types";
import { logError } from "./logger";

/**
 * Plugin to validate anchor links to headings and ensure their case matches their target heading IDs.
 */
export const rehypeValidateHeadingLinks: Plugin<[], Root> = () => {
	return (tree, file) => {
		if (!isMarkdownVFile(file)) {
			return;
		}

		const headings = file.data.headingsWithIds;
		const headingSlugsMap = new Map<string, string>();
		for (const { slug } of headings) {
			headingSlugsMap.set(slug.toLowerCase(), slug);
		}

		visit(tree, { type: "element", tagName: "a" }, (node) => {
			const href = node.properties["href"];
			if (typeof href !== "string" || !href.startsWith("#")) return;

			const targetHeadingSlug = href.slice(1);
			const headingSlug = headingSlugsMap.get(targetHeadingSlug.toLowerCase());
			if (!headingSlug) {
				logError(
					file,
					node,
					`[${rehypeValidateHeadingLinks.name}] Unknown anchor link to heading "${href}" in "${file.path}".`,
				);
				return;
			}

			if (headingSlug !== targetHeadingSlug) {
				logError(
					file,
					node,
					`[${rehypeValidateHeadingLinks.name}] Anchor link to heading "${href}" has wrong case. Replacing with "#${headingSlug}" in "${file.path}".`,
				);
				node.properties["href"] = `#${headingSlug}`;
			}
		});
	};
};
