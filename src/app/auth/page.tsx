"use client"
import React, { useContext, useState } from "react"
import styles from "./page.module.scss"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"
import {
  UserLoginParams,
  UserRegisterParams,
} from "@/api/models/ApiUser"
import { UserContext } from "../../context/userContext"
import { User, UserContextType } from "@/model/user"

export default function page() {
  const { storeAccessToken } = useContext(
    UserContext
  ) as UserContextType

  const [isLogin, setIsLogin] = useState(true)
  const [isLengthValid, setIsLengthValid] = useState(false)
  const [hasUppercase, setHasUppercase] = useState(false)
  const [hasLowercase, setHasLowercase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasSpecialChar, setHasSpecialChar] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  })

  const registerApi = useApiStatus({
    api: CarRentalApi.user.register,
    onSuccess({ result }) {
      storeAccessToken(result.accessToken)
      window.location.pathname = "/"
    },
    onFail({ message }) {
      console.log(message)
    },
  })
  const loginApi = useApiStatus({
    api: CarRentalApi.user.login,
    onSuccess({ result }) {
      storeAccessToken(result.accessToken)
      window.location.pathname = "/"
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  const submit = (data: UserLoginParams | UserRegisterParams) => {
    if (isLogin) {
      loginApi.fire(data as UserLoginParams)
    } else {
      registerApi.fire(data as UserRegisterParams)
    }
  }

  // Update password state and check conditions
  const handlePasswordChange = (passwordValue: string) => {
    // Check length
    setIsLengthValid(passwordValue.length >= 8)

    // Check for at least one uppercase letter
    setHasUppercase(/[A-Z]/.test(passwordValue))

    // Check for at least one lowercase letter
    setHasLowercase(/[a-z]/.test(passwordValue))

    // Check for at least one number
    setHasNumber(/\d/.test(passwordValue))

    // Check for at least one special character
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue))
  }

  // Check if the password meets all the requirements
  const isPasswordValid =
    isLengthValid &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar

  return (
    <main className={styles.main}>
      <div>
        <h1>
          {isLogin ? "Welcome Back!" : "Welcome to Mount Motors"}
        </h1>
      </div>
      <div className={styles.form}>
        <h1> {isLogin ? "Login" : "Create new account"}</h1>
        <form>
          {isLogin || (
            <div className={styles.input}>
              <label>Username</label>
              <Controller
                rules={{
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Username must be alphanumeric",
                  },
                }}
                control={control}
                name="userName"
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <input
                      className={
                        errors.userName ? styles.errorInput : ""
                      }
                      value={value}
                      onChange={onChange}
                      type="text"
                      placeholder="Username"
                    />
                  )
                }}
              />
              <p className={styles.errorMessage}>
                {errors.userName?.message}
              </p>
            </div>
          )}
          <div className={styles.input}>
            <label>Email</label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <input
                    className={errors.email ? styles.errorInput : ""}
                    value={value}
                    onChange={onChange}
                    type="email"
                    placeholder="Email"
                  />
                )
              }}
            />
            <p className={styles.errorMessage}>
              {errors.email?.message}
            </p>
          </div>
          <div className={styles.input}>
            <label>Password</label>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <input
                    className={
                      errors.password ? styles.errorInput : ""
                    }
                    value={value}
                    onChange={(e) => {
                      onChange(e)
                      handlePasswordChange(e.target.value)
                    }}
                    type="password"
                    placeholder="Password"
                  />
                )
              }}
            />

            <p className={styles.errorMessage}>
              {errors.password?.message}
            </p>

            {isLogin || (
              <div className={styles.passwordCheck}>
                <ul>
                  <li
                    style={{ color: isLengthValid ? "green" : "red" }}
                  >
                    Minimum 8 characters: {isLengthValid ? "✔" : "✘"}
                  </li>
                  <li
                    style={{ color: hasUppercase ? "green" : "red" }}
                  >
                    At least one uppercase letter:{" "}
                    {hasUppercase ? "✔" : "✘"}
                  </li>
                  <li
                    style={{ color: hasLowercase ? "green" : "red" }}
                  >
                    At least one lowercase letter:{" "}
                    {hasLowercase ? "✔" : "✘"}
                  </li>
                  <li style={{ color: hasNumber ? "green" : "red" }}>
                    At least one number: {hasNumber ? "✔" : "✘"}
                  </li>
                  <li
                    style={{
                      color: hasSpecialChar ? "green" : "red",
                    }}
                  >
                    At least one special character:{" "}
                    {hasSpecialChar ? "✔" : "✘"}
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={(event) => {
              event.preventDefault()
              handleSubmit(submit)()
            }}
            className={styles.btn}
          >
            {isLogin ? "Login" : "SignUp"}
          </button>
        </form>
        <p className={styles.toggle}>
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            onClick={() => {
              reset()
              setIsLogin(!isLogin)
            }}
          >
            {!isLogin ? "Login" : "SignUp"}
          </span>
        </p>
      </div>
    </main>
  )
}
