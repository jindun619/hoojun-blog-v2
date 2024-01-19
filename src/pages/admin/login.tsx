import React, { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

export default function AdminLoginPage() {
  const router = useRouter();

  const [inputPassword, setInputPassword] = useState<string>("");

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputPassword(value);
  };

  const submitHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    await axios
      .post("/api/login", { password: inputPassword })
      .then((res) => {
        if (res.data.success) {
          router.push("/admin");
        } else {
          alert("Wrong Password! Who the f*** are you?");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="flex gap-1">
        <input
          type="password"
          placeholder="Enter Password"
          className="input input-bordered w-full max-w-xs"
          onChange={inputChangeHandler}
        />
        <input
          type="submit"
          value="로그인"
          className="btn btn-primary"
          onClick={submitHandler}
        />
      </form>
    </div>
  );
}
