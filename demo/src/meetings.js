import React, { useState } from 'react';
import { render } from 'react-dom';
import { RRule, RRuleSet, rrulestr } from 'rrule'

import CitySelect from "../../src/InputFields/CitySelect";
import PlaceSelect from "../../src/InputFields/PlaceSelect";
import TimeZoneSelect from "../../src/InputFields/TimeZoneSelect";
import LanguageSelect from "../../src/InputFields/LanguageSelect";
import SelectWithLabel from "../../src/InputFields/SelectWithLabel";

import CheckboxWithLabel from "../../src/InputFields/CheckboxWithLabel"
import DatePickerWithLabel from "../../src/InputFields/DatePickerWithLabel"
import ImageUploader from "../../src/InputFields/ImageUploader"
import InputWithLabel from "../../src/InputFields/InputWithLabel"
import URLInputWithLabel from "../../src/InputFields/URLInputWithLabel"
import RangeSliderWithLabel from "../../src/InputFields/RangeSliderWithLabel"
import SwitchWithLabels from "../../src/InputFields/SwitchWithLabels"
import TextareaWithLabel from "../../src/InputFields/TextareaWithLabel"
import TimePickerWithLabel from "../../src/InputFields/TimePickerWithLabel"
import MobileInput from "../../src/InputFields/MobileInput"
import RichTextWithLabel from "../../src/InputFields/RichTextWithLabel"


const MeetingScheduler = (props) => {

  const [state, setState] = useState(props);
  const handleChange = (newContent) => {
    setState({
      ...state,
      content: {
        ...content,
        ...newContent
      }
    })
  }

  const { content, meetings } = state;

  const generateMeetings = () => {
    let opts = {
      dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
      count: parseInt(content.meetingCount),
    }

    if (content.frequency === 'weekly') {
      opts.freq = RRule.WEEKLY
      opts.interval = 1
      opts.byweekday = content.weekday
    } else if (content.frequency === 'biweekly') {
      opts.freq = RRule.WEEKLY
      opts.interval = 2
      opts.byweekday = content.weekday
    } else if (content.freqency === 'monthly') {
      opts.freq = RRule.MONTHLY
      opts.interval = 1
    }

    console.log(opts)

    const rule = new RRule(opts)
    const meetings = rule.all()

    setState({ ...state, meetings })
  }


  return(
    <div className="container my-5">
      <h1>Meeting Scheduler Demo</h1>

      <DatePickerWithLabel
        name="startDate"
        label="What is the date of the first learning circle?"
        value={content['startDate']}
        handleChange={handleChange}
        helpText="The date format is YYYY-MM-DD"
        required
      />

      <SelectWithLabel
        options={[
          { label: 'Every week', value: 'weekly' },
          { label: 'Every 2 weeks', value: 'biweekly' },
          { label: 'Every month', value: 'monthly' }
        ]}
        name='frequency'
        value={content['frequency']}
        handleChange={handleChange}
        label="How often will you meet?"
      />

      {
        (content['frequency'] !== 'monthly') &&
        <SelectWithLabel
          options={[
            { label: 'Monday', value: RRule.MO },
            { label: 'Tuesday', value: RRule.TU },
            { label: 'Wednesday', value: RRule.WE },
            { label: 'Thursday', value: RRule.TH },
            { label: 'Friday', value: RRule.FR },
            { label: 'Saturday', value: RRule.SA },
            { label: 'Sunday', value: RRule.SU }
          ]}
          name='weekday'
          value={content['weekday']}
          handleChange={handleChange}
          label="On which days will you meet?"
          isMulti={true}
        />
      }

      {
        content['frequency'] === 'monthly' &&
        <SelectWithLabel
          options={[
            { label: 'First weekday of the month', value: 'weekly' },
            { label: 'Every 2 weeks', value: 'biweekly' },
            { label: 'Every month', value: 'monthly' }
          ]}
          name='monthday'
          value={content['monthday']}
          handleChange={handleChange}
          label="On which days will you meet?"
        />
      }


      <InputWithLabel
        name="meetingCount"
        label="How many times will you meet?"
        value={content['meetingCount']}
        handleChange={handleChange}
        type={'number'}
      />

      <TimePickerWithLabel
        name="startTime"
        label="What time will your learning circle meet?"
        value={content['startTime']}
        handleChange={handleChange}
      />

      <button onClick={generateMeetings}>Generate meetings</button>

      <ul>
        {
          meetings.map(meeting => <li key={meeting.toUTCString()}>{meeting.toUTCString()}</li>)
        }
      </ul>

    </div>
  );
}

MeetingScheduler.defaultProps = {
  content: {
    meetingCount: 6,
    frequency: 'weekly',
    startTime: '14:00',

  },
  meetings: [],
}

render(<MeetingScheduler />, document.getElementById("root"));
