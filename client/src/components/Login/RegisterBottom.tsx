import { Button } from "flowbite-react";

interface LoginBottomProps {
  setIsLogin: (isLogin: boolean) => void;
}

export const RegisterBottom = (props: LoginBottomProps) => {
  return (
    <div className="col-12 flex justify-end">
      <Button
        color=""
        className="hover:text-cyan-500"
        onClick={() => props.setIsLogin(false)}
      >
        Already have an account?
        <span className="text-blue-500 ms-1">Login</span>
      </Button>
    </div>
  );
};
