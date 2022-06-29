import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Compose.css';

function ComposeMail({ isOpen, setIsOpen }) {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      subject: '',
      text: ''
    },
    onSubmit: async (values) => {
      const token = window.localStorage.getItem("my_token")
      try {
        await axios.post("https://gmail-clone-api.herokuapp.com/api/mailer/send", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS'
          }
        })
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    },
  });
  return (
    isOpen ? (<div className="popup-box">
      <div className="popup-header">
        <span>New Message</span>
        <div className="popup-btn">
          <i><span className="material-icons" isOpen={false} onClick={() => setIsOpen(false)}>close</span></i>
        </div>
      </div>
        <div className="popup-content">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Recipients"
              autoFocus
              required
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              onChange={formik.handleChange}
              value={formik.values.subject}
            />
            <textarea
              className="popup-message"
              type="text"
              name="text"
              required
              onChange={formik.handleChange}
              value={formik.values.text}
            />

            <div className="popup-send-btn">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
    </div>) : ""
  )
}

export default ComposeMail