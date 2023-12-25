
export default function convertToString(postsFilterResult: any) {
  postsFilterResult?.forEach((obj: any) => {
    obj.ar.title = obj.ar.title.toString()
    obj.ar.content = obj.ar.content.toString()
  }
  )
  return postsFilterResult
}