type loadImageButtonProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const LoadImageButton: React.FC<loadImageButtonProps> = ({ onChange }) => {
  return (
    <input
      type='file'
      accept='image/*'
      onChange={onChange}
      style={{ display: 'none' }}
      id='file-input'
    />
  )
}

export {
  LoadImageButton
}