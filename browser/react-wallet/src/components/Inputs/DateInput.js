// import React from "react";

// export class DateInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       day: "",
//       month: "",
//       year: ""
//     }
//     this.dayInput = React.createRef();
//     this.monthInput = React.createRef();
//     this.yearInput = React.createRef();
//   }

//   resetState = () => {
//     this.setState({
//       day: "",
//       month: "",
//       year: "",
//     })
//     this.setValidity(true);
//   }

//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//     this.handleAutoTab(e);
//     if (this.props.onChange) {
//       this.handlePropValue(e);
//     }
//     this.handleValidity(e);
//   };

//   handleAutoTab = (e) => {
//     if (e.target.value.length > 1) {
//       if (e.target.name === "day") {
//         this.monthInput.current.focus();
//         return;
//       }
//       if (e.target.name === "month") {
//         this.yearInput.current.focus();
//         return;
//       }
//     }
//   }

//   handlePropValue = (e) => {
//     const { day, month, year } = this.state;
//     let value = "";
//     switch (e.target.name) {
//       case "year":
//         value = `${e.target.value}-${month}-${day}`
//         this.props.onChange(value);
//         break;
//       case "month":
//         value = `${year}-${e.target.value}-${day}`
//         this.props.onChange(value);
//         break;
//       case "day":
//         value = `${year}-${month}-${e.target.value}`
//         this.props.onChange(value);
//         break;
//       default:
//         return `${year}-${month}-${day}`
//     }
//   }

//   handleKeyDown = (e) => {
//     const BACKSPACE = 8;
//     if (e.keyCode === BACKSPACE) {
//       if (e.target.value.length === 0) {
//         if (e.target.name === "year") {
//           this.monthInput.current.focus();
//         }
//         if (e.target.name === "month") {
//           this.dayInput.current.focus();
//         }
//       }
//     }
//   };

//   onBlur = (e) => {
//     let num = e.target.value;
//     if (num && num.length === 1) {
//       e.target.value = "0" + num;
//       this.handleChange(e);
//     }
//   };

//   handleValidity = (e) => {
//     const { day, month, year } = this.state;
//     let value = "";
//     switch (e.target.name) {
//       case "year":
//         value = `${e.target.value}-${month}-${day}`
//         break;
//       case "month":
//         value = `${year}-${e.target.value}-${day}`
//         break;
//       case "day":
//         value = `${year}-${month}-${e.target.value}`
//         break;
//       default:
//         value = `${year}-${month}-${day}`
//     }
//     let inputDate = new Date(value);
//     let now = new Date();

//     console.log(value, inputDate);
//     if (inputDate > -3786825600000) {
//       this.setValidity(true);
//     }
//     else if (value === "--" && this.props.required === false) {
//       this.setValidity(true);
//     }
//     else {
//       this.setValidity(false);
//     }
//     if (inputDate.getFullYear() > now.getFullYear()) {
//       this.yearInput.current.setCustomValidity("Invalid year");
//     }
//   }

//   setValidity(valid) {
//     if (valid) {
//       this.dayInput.current.setCustomValidity("");
//       this.monthInput.current.setCustomValidity("");
//       this.yearInput.current.setCustomValidity("");
//     }
//     else {
//       this.dayInput.current.setCustomValidity("Invalid date");
//       this.monthInput.current.setCustomValidity("Invalid date");
//       this.yearInput.current.setCustomValidity("Invalid date");
//     }
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <div className="row no-gutters">
//           <Form.Group as={Col} sm="3">
//             <Form.Control
//               required={this.props.required ? true : false}
//               ref={this.dayInput}
//               type="number"
//               maxLength="2"
//               name="day"
//               pattern="^([1-9]|[12][0-9]|3[01])$"
//               value={this.state.day}
//               onChange={this.handleChange}
//               onKeyDown={this.handleKeyDown}
//               onBlur={this.onBlur}
//               placeholder="DD"
//             />
//             <Form.Control.Feedback type="invalid">
//               {this.props.required ? "" : "Invalid day"}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Col sm="1" />
//           <Form.Group as={Col} sm="3">
//             <Form.Control
//               required={this.props.required ? true : false}
//               ref={this.monthInput}
//               name="month"
//               pattern="[2-9]|0[1-9]|1[0-2]"
//               value={this.state.month}
//               onChange={this.handleChange}
//               onKeyDown={this.handleKeyDown}
//               onBlur={this.onBlur}
//               placeholder="MM"
//             />
//             <Form.Control.Feedback type="invalid">
//               {this.props.required ? "" : "Invalid month"}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Col sm="1" />
//           <Form.Group as={Col} sm="4">
//             <Form.Control
//               required={this.props.required ? true : false}
//               ref={this.yearInput}
//               name="year"
//               value={this.state.year}
//               onChange={this.handleChange}
//               onKeyDown={this.handleKeyDown}
//               placeholder="YYYY"
//             />
//             <Form.Control.Feedback type="invalid">
//               {this.props.required ? "" : "Invalid year"}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </div>
//       </React.Fragment>
//     );
//   }
// }
