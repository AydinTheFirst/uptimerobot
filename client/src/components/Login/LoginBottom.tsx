import { Button } from "flowbite-react";

interface LoginBottomProps {
  setIsLogin: (isLogin: boolean) => void;
}

export const LoginBottom = (props: LoginBottomProps) => {
  return (
    <div className="col-12 flex flex-wrap justify-between">
      <Button color="" size={"sm"} className="hover:text-cyan-500">
        Forget Password?
      </Button>
      <Button
        color=""
        className="hover:text-cyan-500"
        onClick={() => props.setIsLogin(true)}
      >
        Don't have an account?
        <span className="text-blue-500 ms-1">Sign Up</span>
      </Button>
    </div>
  );
};
