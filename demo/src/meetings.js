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

const weekdays = [
  { label: 'Sunday', value: RRule.SU },
  { label: 'Monday', value: RRule.MO },
  { label: 'Tuesday', value: RRule.TU },
  { label: 'Wednesday', value: RRule.WE },
  { label: 'Thursday', value: RRule.TH },
  { label: 'Friday', value: RRule.FR },
  { label: 'Saturday', value: RRule.SA },
]

const MeetingScheduler = (props) => {

  const [state, setState] = useState(props);
  const handleChange = (newContent) => {
    let presets = {};
    const key = Object.keys(newContent)[0]
    if (key === 'startDate') {
      const [year, month, day] = newContent.startDate.split('-')
      const date = new Date(Date.UTC(year, month-1, day))
      presets.weekday = [weekdays[date.getUTCDay()].value]
      presets.date = date.getUTCDate()
    }
    setState({
      ...state,
      content: {
        ...content,
        ...newContent,
        ...presets
      }
    })
  }

  const { content, meetings } = state;

  const generateMeetings = () => {
    const [year, month, day] = content['startDate'].split('-')
    const date = new Date(Date.UTC(year, month-1, day))
    let opts = {
      dtstart: date,
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
    } else if (content.frequency === 'monthly') {
      opts.freq = RRule.MONTHLY
      opts.interval = 1
      delete opts.byweekday
      if (content.monthday === 'byweekday') {
        opts.byweekday = content.weekday
        opts.bysetpos = 1
      }
    }

    console.log("opts", opts)

    const rule = new RRule(opts)
    const meetings = rule.all()

    setState({ ...state, meetings })
  }

  console.log(content)

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
            { label: `First ${weekdays[content.weekday[0].weekday].label} of the month`, value: 'byweekday' },
            { label: `The ${content.date} of every month`, value: 'bydate' },
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

      <button className="btn p2pu-btn" onClick={generateMeetings}>Generate meetings</button>

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
    monthday: 'bydate'
  },
  meetings: [],
}

render(<MeetingScheduler />, document.getElementById("root"));
