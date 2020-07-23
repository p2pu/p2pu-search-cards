import React from 'react'
import PropTypes from 'prop-types'
import InputWrapper from '../InputWrapper'
import { Editor } from '@tinymce/tinymce-react';

const TextareaWithLabel = (props) => {
  const {
    name,
    id,
    label,
    value,
    handleChange,
    required,
    disabled,
    errorMessage,
    helpText,
    classes,
    placeholder,
    apiKey,
    ...rest
  } = props;

  const onChange = input => {
    props.handleChange({ [props.name]: input })
  }

  return (
    <InputWrapper
      label={label}
      name={name}
      id={id}
      required={required}
      disabled={disabled}
      errorMessage={errorMessage}
      helpText={helpText}
      classes={classes}
    >
      <Editor
        apiKey={apiKey}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'link lists'
          ],
          toolbar: 'undo redo | formatselect | bold italic | bullist numlist | link | removeformat',
          'valid_elements': 'p,h3,h4,h5,h6,strong,em,a,a[href|target=_blank|rel=noopener],ul,ol,li,div,span',
          'block_formats': 'Paragraph=p; Heading 1=h3; Heading 2=h4; Heading 3=h5',
        }}
      />
    </InputWrapper>
  )
}

TextareaWithLabel.defaultProps = {
  type: 'text',
  value: "",
  required: false,
  disabled: false,
  label: 'Textarea input',
  classes: '',
  apiKey: '',
  handleChange: (input) => console.log("Implement a function to save input", input)
}

TextareaWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  classes: PropTypes.string,
}

export default TextareaWithLabel;
