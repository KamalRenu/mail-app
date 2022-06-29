import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./SingleMail.css";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import axios from 'axios';

function SingleMail() {
  const [Mail, setMail] = useState([])
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    (async () => {
      fetchUser()
    })();
  }, [])

  let fetchUser = async () => {
    const token = window.localStorage.getItem("my_token")
    try {
      let mailList = await axios.get(`https://gmail-clone-api.herokuapp.com/api/mailer/single-mail/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setMail(mailList.data)
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    const token = window.localStorage.getItem("my_token")
    try {
      let result = window.confirm("Are you sure do you want to delete?")
      if (result) {
        await axios.delete(`https://gmail-clone-api.herokuapp.com/api/mailer/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Topbar />
      <div className="main_body">
        <Sidebar />
        <div className="emailList">
          <div className="final-design">
            <article className="single-mail">
              <div className="btn-group">
                <i onClick={() => navigate("/dashboard")} style={{ all: "unset" }}>
                  <span className="material-icons">arrow_back</span>
                </i>
                <i onClick={() => handleDelete(Mail._id)}>
                  <span className="material-icons">delete</span>
                </i>
                <i>
                  <span className="material-icons">schedule</span>
                </i>
                <i>
                  <span className="material-icons">download</span>
                </i>
                <i>
                  <span className="material-icons">sell</span>
                </i>
                <i>
                  <span className="material-icons">more_vert</span>
                </i>
                <div className="side-button">
                  <i>
                    <span className="material-icons">print</span>
                  </i>
                </div>
              </div>
              <section>
                <div className="mail-heading">
                  <span className="title">{Mail.email}</span>
                  <span>
                    <div className="content-btn-group">
                      <div>inbox</div>
                      <div> x</div>
                    </div>
                  </span>
                </div>
                <div className="mail-box">
                  <div className="mail-user">
                    <img
                      src="https://lh3.googleusercontent.com/a-/AOh14Ghq--_zhxbly4U4eeKKxwYyNo7VMz7-5XMPpzEDhQ=s40"
                      alt="avtar"
                    />
                  </div>
                  <div className="mail-content">
                    <div className="user-mail-header">
                      <div className="user-mail-header1">
                        <span>
                          <b> {Mail.subject} </b>
                        </span>
                        <span>
                          {" "}
                          &lt;{Mail.email}&gt;{" "}
                        </span>
                      </div>
                      <div className="user-mail-header2">
                        <span style={{ fontSize: "0.8rem" }}>
                          15 Oct 2021, 23:30 (10 hours ago){" "}
                        </span>
                      </div>
                    </div>
                    <div className="inner-main-content">
                      <p style={{ fontSize: "0.9rem" }}>
                        {Mail.text}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="btn-group-reply">
                  <button onClick={() => { navigate("/dashboard") }}>
                    <span className="material-icons">arrow_back</span>Back
                  </button>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleMail