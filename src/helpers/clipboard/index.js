const copyToClipboard = data => {
  let value = data.toString()
  navigator.permissions.query({ name: "clipboard-write" }).then(result => {
    if (result.state === "granted") {
      const type = "text/plain"
      const blob = new Blob([value], { type })
      let data = [new window.ClipboardItem({ [type]: blob })]
      navigator.clipboard.write(data).then(
        err => null,
        err => err => alert(err)
      )
    } else alert("You need to grant clipboard permissions!")
  })
}

export default copyToClipboard
