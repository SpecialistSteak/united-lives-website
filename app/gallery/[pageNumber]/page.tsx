export default function Page({ params }: { readonly params: { pageNumber: number } }) {
  return <div>My Post: {params.pageNumber.toString()}</div>
}