import React, { useState } from 'react';
import { render } from 'react-dom';

import CitySelect from "../../src/input-fields/CitySelect";
import PlaceSelect from "../../src/input-fields/PlaceSelect";
import TimeZoneSelect from "../../src/input-fields/TimeZoneSelect";
import LanguageSelect from "../../src/input-fields/LanguageSelect";
import SelectWithLabel from "../../src/input-fields/SelectWithLabel";

import CheckboxWithLabel from "../../src/input-fields/CheckboxWithLabel"
import DatePickerWithLabel from "../../src/input-fields/DatePickerWithLabel"
import ImageUploader from "../../src/input-fields/ImageUploader"
import InputWithLabel from "../../src/input-fields/InputWithLabel"
import RangeSliderWithLabel from "../../src/input-fields/RangeSliderWithLabel"
import SwitchWithLabels from "../../src/input-fields/SwitchWithLabels"
import TextareaWithLabel from "../../src/input-fields/TextareaWithLabel"
import TimePickerWithLabel from "../../src/input-fields/TimePickerWithLabel"

const App = () => {
  const [content, setContent] = useState({});
  const handleChange = (newContent) => {
    setContent({
      ...content,
      ...newContent
    })
  }

  console.log('content', content)

  return(
    <div className="container my-5">
      <h1>P2PU Input Fields Demo</h1>
      <h2 className="my-4">Generic inputs</h2>
      <InputWithLabel
        name="text-input-demo"
        label="Text input"
        value={content['text-input-demo']}
        handleChange={handleChange}
      />
      <InputWithLabel
        name="number-input-demo"
        label="Number input"
        value={content['number-input-demo']}
        handleChange={handleChange}
        type={'number'}
      />
      <InputWithLabel
        name="nativedate-input-demo"
        label="Native date input"
        value={content['nativedate-input-demo']}
        handleChange={handleChange}
        type={'date'}
      />
      <InputWithLabel
        name="color-input-demo"
        label="Colour picker"
        value={content['color-input-demo']}
        handleChange={handleChange}
        type={'color'}
      />
       <TextareaWithLabel
        name="textarea-demo"
        label="Text area"
        value={content['textarea-demo']}
        handleChange={handleChange}
      />
      <CheckboxWithLabel
        name="checkbox-demo"
        label="Checkbox"
        value={content['checkbox-demo']}
        handleChange={handleChange}
      />
      <DatePickerWithLabel
        name="datepicker-demo"
        label="Date picker"
        value={content['datepicker-demo']}
        handleChange={handleChange}
      />
      <TimePickerWithLabel
        name="timepicker-demo"
        label="Time picker"
        value={content['timepicker-demo']}
        handleChange={handleChange}
      />
      <ImageUploader
        name="image-demo"
        label="Image uploader"
        value={content['image-demo']}
        handleChange={handleChange}
      />
      <RangeSliderWithLabel
        name="range-demo"
        label="Range slider"
        value={content['range-demo']}
        handleChange={handleChange}
      />
      <SwitchWithLabels
        name="switch-demo"
        label="Switch input"
        value={content['switch-demo']}
        handleChange={handleChange}
      />
      <SelectWithLabel
        options={[{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }]}
        name='select-demo'
        value={content['select-demo']}
        handleChange={handleChange}
        label="Select dropdown"
      />
      <SelectWithLabel
        options={[{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }, { label: 'Option 3', value: 'option3' }]}
        name='multiselect-demo'
        value={content['multiselect-demo']}
        handleChange={handleChange}
        label="Select multiple"
        isMulti={true}
      />

      <h2 className="my-4">Selects</h2>
      <CitySelect
        label={'Select a city'}
        classes="form-group"
        name='city-demo'
        value={content['city-demo']}
        handleChange={handleChange}
      />
      <PlaceSelect
        label={'Select a place'}
        classes="form-group"
        name={'place-demo'}
        value={content['place-demo']}
        handleChange={handleChange}
      />
      <TimeZoneSelect
        label={'Select a time zone'}
        name='timezone-demo'
        value={content['timezone-demo']}
        handleChange={handleChange}
      />
      <LanguageSelect
        name='language-demo'
        value={content['language-demo']}
        handleChange={handleChange}
      />

      <h2 className="my-4">Error and Help Text</h2>
      <InputWithLabel
        name="error-text-input-demo"
        label="Text input with errors and help text"
        value={content['error-text-input-demo']}
        handleChange={handleChange}
        helpText="What was the last thing that made you laugh out loud?"
        errorMessage="This field is required"
      />

      <h2 className="my-4">Label placement for checkbox</h2>
      <CheckboxWithLabel
        name="checkbox-demo"
        label="Label positioned left"
        value={content['checkbox-demo']}
        handleChange={handleChange}
        labelPosition="left"
      />
      <CheckboxWithLabel
        name="checkbox-demo"
        label="Label positioned right"
        value={content['checkbox-demo']}
        handleChange={handleChange}
        labelPosition="right"
      />
    </div>
  );
}

render(<App />, document.getElementById("root"));
