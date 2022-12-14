import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import background from "../background_m/appoiintment_image.jpg";
import background from "../background_m/background1.jpg";

export default function AddAppointments  ()  {

    const [nicError, setNicError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[age,setAge] = useState("");
    const[gender,setGender] = useState("");
    const[nic,setNic] = useState("");
    const[country_code,setCountry_code] = useState("");
    const[contact_no,setContact_no] = useState("");
    const[doctor,setDoctor] = useState("");
    const[date,setDate] = useState("");
    const[time,setTime] = useState("");

    const textInput = React.useRef();



    const clearInput = () => (textInput.current.value = "");
       
    function sendData(e){
        e.preventDefault();

        const newAppointment = {
            firstName,
            lastName,
            age,
            gender,
            nic,
            country_code,
            contact_no,
            doctor,
            date,
            time

        }
        if(nicError=="Invalid NIC!!!"){
          alert('Invalid NIC!!!')

        }else if (phoneError=="Invalid Phone number!!!"){
          alert('Invalid Phone number!!!')

        }else{
        axios.post("http://localhost:8070/Appointments/add",newAppointment).then(()=>{
            alert("Appointment added successfully")
            e.target.reset();

        }).catch((err)=>{
            alert(err)
        })    
      }
    }

    const validateNic = (e) => {
        var nic = e.target.value
    
        if (!nicValidation(nic)) {
          setNicError('')
        } else {
          setNicError('Invalid NIC!!!')
        }
      }


      const validatePhone = (e) => {
        var contact_no = e.target.value
    
        if (!phoneValidation(contact_no)) {
          setPhoneError('')
        } else {
          setPhoneError('Invalid Phone number!!!')
        }
      }


    const nicValidation = (nic) => {
        if (nic.length == 10 || nic.length == 12) {
          if (nic.length ===10) {
            // last letter should V
            const lastLetter = nic[nic.length - 1];
            const numbers = nic.slice(0, nic.length - 1);
            console.log(numbers, !isNaN(numbers))
            if ((lastLetter === 'V' || lastLetter === 'v') && !isNaN(numbers)) return false;
    
            return true;
          }
    
          // if length 12
          else if (nic.length == 12) {
            // only digits
            if (!isNaN(nic)) return false;
    
            return true;
          }
        }
        else {
          return true;
        }
      };


      const phoneValidation= (contact_no) => {
     
          if (contact_no.length == 9) {
            // last number should 0
            const firstLetter = contact_no[0];
            const numbers = contact_no.slice(0, contact_no.length - 1);
            console.log(numbers, !isNaN(numbers))
            if ((firstLetter != '0' ) && !isNaN(numbers)) return false;
    
            return true;
          }
          else {
            return true;
        }
      };
    
      function datelimit() {
        var todayDate = new Date();
        var month = todayDate.getMonth() + 1; // current month
        var year = todayDate.getUTCFullYear();// current year
        var tdate = todayDate.getDate();// current date
    
        if (month < 10) {
          month = "0" + month
        }
        if (tdate < 10) {
          tdate = "0" + tdate
        }
        var minDate = year + "-" + month + "-" + tdate;
        document.getElementById("demo").setAttribute("min", minDate);
        console.log(minDate)
      }


  return(

    <div style={{backgroundImage: `url(${background})`, backgroundRepeat:'no-repeat', backgroundSize:'cover',backgroundPosition:'center', backgroundAttachment:'fixed'}}>
    
    <div className ="container" >
    <br></br><br/>

    <Link to="/viewAppointments" className="">                
        <button className="btn btn-primary" type='submit' style={{marginLeft:'580px', marginBottom:'30px'}}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-text-sidebar-reverse" viewBox="0 0 16 16">
  <path d="M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z"/>
  <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h2zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5V1z"/>
</svg>    View All Appointments </button>
    </Link>
      
    <form  className="form1" style={{backgroundColor:'#fafafa',padding:'30px 30px',width:'850px',marginLeft:'250px '}}  onSubmit={sendData} >

      <h1 style={{textAlign:'center'}}>Add an Appointment </h1> <br/><hr></hr><br/><br/>

      <div className="form-group row g-3">
          <label htmlFor="firstName" className="col-sm-2 col-form-label"><b>Name</b></label>
          <div className="col">
              <input className="form-control" type="text" name='firstName' id="firstName" placeholder="First Name" 
                      onChange={(e) =>{setFirstName(e.target.value);}} required />
          </div>
                    
          <div className="col">
              <input className="form-control" type="text" name='lastName' id="lastName" placeholder="Last Name" 
                      onChange={(e) =>{setLastName(e.target.value);}} required />
          </div>

      </div>
       
      <br></br><br/>

      <div className="form-group row g-3">
          <label htmlFor="nic" className="col-sm-2 col-form-label"><b>NIC</b></label>
              <div className="col-auto">
                  <input className="form-control" type="text" name='nic'  placeholder="Enter NIC"
                      onInput={validateNic} onChange={(e) =>{setNic(e.target.value);}} required  />
                  <span style={{fontWeight: 'bold',color: 'red'}}> {nicError} </span>
              </div>

      </div>

      <br></br><br/>

      <div className="form-group row g-3">
        <label htmlFor="age" className="col-sm-2 col-form-label">  
            <b> Age</b>
        </label>
            <div className="col-auto">
                <input className="form-control" type="text" name='age' id="age" placeholder="Enter Age" 
                        onChange={(e) =>{setAge(e.target.value);}} required/>
            </div>
      </div>
      
    
      <br></br><br/>
        <div className="form-group row g-3 ">
          <label htmlFor="gender"  className="col-sm-2 col-form-label"><b>Gender</b></label>
              <div className="col-auto">
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="gender" id="Male" value="Male"
                        onChange={(e) =>{setGender(e.target.value);}} />
                      <label class="form-check-label"  for="flexRadioDefault1">
                          Male
                      </label>
                  </div>
              </div>

              <div className="col-auto">

                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="gender" id="Female" value="Female"
                          onChange={(e) =>{setGender(e.target.value);}} />
                      <label class="form-check-label"  for="flexRadioDefault1">
                          Female
                      </label>
                  </div>
              </div>
        </div>

        <br></br><br/>
        
        
        <div className="form-group row g-3">
            <label htmlFor="contact_no" className="col-sm-2 col-form-label"><b>Contact Number &nbsp;</b></label>
                <div className="col-auto">
                  <input className="form-control" type='text' placeholder="+94" id="country_code" style={{width: '70px'}} Value="+94"
                  onChange={(e) =>{setCountry_code(e.target.value);}}disabled></input>
                </div>

                <div className="col-auto" >
                <input className="form-control" type="tel" name='contact_no' id="contact_no" placeholder="ex:- 779814922 "  style={{width:'90%'}}
                    onInput={validatePhone} onChange={(e) =>{setContact_no(e.target.value);}} required  />
                <span style={{fontWeight: 'bold',color: 'red'}}> {phoneError} </span></div>
        </div>

        <br></br><br/>

        <div className="form-group row g-3">
            <label htmlFor="doctor" className="col-sm-2 col-form-label"><b>Doctor</b></label>
            <div className="col">
            <select className="form-control" name="doctor" id="doctor" style={{width:'48%'}} onChange={(e) =>{
                    setDoctor(e.target.value);
                }}  required  >
              <option Value="">Choose a Doctor       </option>
              <option value="Dr.Menaka Rajasooriya (Cardiologist)"> Dr.Menaka Rajasooriya (Cardiologist)</option>
              <option value="Dr.Herath Wijesooriya (General)" > Dr.Herath Wijesooriya (General)</option>
              <option value=" Dr.Ananda Fernando (Dermologists)" > Dr.Ananda Fernando (Dermologists)</option>
              <option value="Dr.Nadini Premadasa (General)" > Dr.Nadini Premadasa (General)</option>
              <option value="Dr.Madhusha Karunarathne (Neurologist)" > Dr.Madhusha Karunarathne (Neurologist)</option>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg>
            </select>
            
            </div>
        </div>

        <br></br><br/>

        <div className="form-group row g-3">
            <label htmlFor="date" className="col-sm-2 col-form-label"><b>Date</b></label>
                <div className="col">
                    <input className="form-control" type="date" name='date' id="demo" 
                        onSelect={datelimit}
                        onChange={(e) =>{setDate(e.target.value);}} required  />
                </div>
                
            <label htmlFor="time" className="col-sm-2 col-form-label">  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <b> Time</b>
            </label>

                <div className="col">
                  <select className="form-control" name="time" id="time" style={{width:'60%'}} 
                    onChange={(e) =>{setTime(e.target.value);}}  required>
                      <option Value="">Select Time</option>
                      <option value="08:00"> 08:00 </option>
                      <option value=" 08:30"> 08:30 </option>
                      <option value="09:00"> 09:00 </option>
                      <option value="09:30"> 09:30 </option>
                      <option value=" 10:00"> 10:00 </option>
                      <option value="10:30 "> 10:30 </option>
                      <option value="16:00"> 16:00 </option>
                      <option value=" 16:30"> 16:30 </option>
                      <option value="17:00"> 17:00 </option>
                      <option value="17:30"> 17:30 </option>
                      <option value=" 18:00"> 18:00 </option>
                      <option value="18:30"> 18:30 </option>
                      <option value="19:00"> 19:00 </option>
                  </select>
                </div>

        </div>

        <br></br>
        <br></br><br/>

      <button className="btn btn-success" type='submit' style={{marginLeft:'18%',width:'150px',height:'45px'}} >Save</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <button className="btn btn-danger" onClick={clearInput} type= 'reset' style={{marginLeft:'22%',width:'150px',height:'45px'}}>Clear</button>
    
    </form>

    <br></br>
    <br></br>
    </div> 
  </div>
  )
};


























