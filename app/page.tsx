export default function Home() {
  async function getPosts() {
    const res = await fetch(`${}`)
  }
  return (
    <>
      <div>This is the begining .</div>
    </>
  )
}