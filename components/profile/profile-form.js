import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    // Add your password change logic here
    if (!enteredOldPassword || !enteredNewPassword) {
      alert("Please enter both passwords.");
      return;
    }
    if (enteredOldPassword === enteredNewPassword) {
      alert("New password must be different from old password.");
      return;
    }
    if (enteredNewPassword.length < 7) {
      alert("New password must be at least 7 characters long.");
      return;
    }
    // Simulate a password change
    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
