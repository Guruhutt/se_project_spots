export function setButtonText(
  btn,
  isloading,
  loadingText = "Saving...",
  defaultText = "Save"
) {
  if (isloading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}
