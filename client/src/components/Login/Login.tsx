import { Button, FloatingLabel } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!usernameInput.current) return;
    usernameInput.current.focus();
  }, []);

  useEffect(() => {
    if (!passwordInput.current) return;
    passwordInput.current.type = isPasswordVisible ? "text" : "password";
  }, [isPasswordVisible]);

  return (
    <form action="" className="row g-3">
      <div className="col-12">
        <h1 className="text-lg font-bold">Login</h1>
      </div>
      <div className="col-12">
        <FloatingLabel
          ref={usernameInput}
          variant="standard"
          label="Username"
          minLength={5}
          maxLength={16}
          required
        />
      </div>
      <div className="col-12 relative">
        <FloatingLabel
          ref={passwordInput}
          variant="standard"
          label="Password"
          type="password"
          minLength={8}
          required
        />
        <button
          type="button"
          className="absolute top-1/2 end-3 transform -translate-y-1/2"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <div className="col-12">
        <Button color="blue" className="rounded-none" fullSized>
          Login
        </Button>
      </div>
    </form>
  );
};
