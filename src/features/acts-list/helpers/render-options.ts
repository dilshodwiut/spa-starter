export default function renderOptions(
  options: Array<{ label: string; value: number }> | undefined,
  arr: Array<{ law_article_id: number }>,
): string {
  return arr
    .reduce((acc: string[], curr) => {
      const article = options?.find(
        (artcl) => artcl.value === curr.law_article_id,
      );
      if (article !== undefined) {
        return acc.concat(article.label);
      }

      return acc;
    }, [])
    .join(", ");
}
