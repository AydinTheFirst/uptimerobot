import { Button, FloatingLabel } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);
  const displayNameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!passwordInput.current) return;
    passwordInput.current.type = isPasswordVisible ? "text" : "password";
  }, [isPasswordVisible]);

  useEffect(() => {
    if (!displayNameInput.current) return;
    displayNameInput.current.focus();
  }, []);

  return (
    <>
      <form action="" className="row g-3" onSubmit={(e) => e.preventDefault()}>
        <div className="col-12">
          <h1 className="text-lg font-bold">Signup</h1>
        </div>
        <div className="col-12">
          <FloatingLabel
            ref={displayNameInput}
            variant="standard"
            label="Display Name"
            helperText="eg Halil Aydın"
            required
            minLength={5}
            maxLength={20}
          />
        </div>
        <div className="col-12">
          <FloatingLabel
            variant="standard"
            label="Username"
            minLength={5}
            maxLength={16}
            required
          />
        </div>
        <div className="col-12">
          <FloatingLabel
            variant="standard"
            label="Email"
            type="email"
            required
          />
        </div>
        <div className="col-12 relative">
          <FloatingLabel
            ref={passwordInput}
            variant="standard"
            label="Password"
            type="password"
            helperText="Must be at least 8 characters long"
            minLength={8}
          />
          <button
            type="button"
            className="absolute top-1/2 end-3 transform -translate-y-4"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="col-12">
          <Button
            type="submit"
            color="green"
            className="rounded-none"
            fullSized
          >
            Register
          </Button>
        </div>
      </form>
    </>
  );
};
