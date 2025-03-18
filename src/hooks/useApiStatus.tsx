import { AxiosError, AxiosResponse } from "axios"
import { useEffect, useState } from "react"

type ApiCall = (...args: any[]) => Promise<AxiosResponse<any>>

export type ValidationErrors = {
  [attributeName: string]: string[]
}

type ExtractReturnType<Call extends ApiCall> =
  ReturnType<Call> extends Promise<AxiosResponse<infer ResponseData>>
    ? ResponseData
    : never

interface ApiStatusOptions<Call extends ApiCall> {
  api: Call
  defaultParams?: Parameters<Call>
  fireOnMount?: boolean
  updateSilently?: boolean
  onSuccess?: (data: {
    result: ExtractReturnType<Call>
    args: Parameters<Call>
  }) => void
  onFail?: (error: AxiosError) => void
}

interface ApiStatus<Call extends ApiCall> {
  isLoading: boolean
  errorMessage: string | undefined
  validationErrors: ValidationErrors | undefined
  data: ExtractReturnType<Call> | undefined
  previousArguments: Parameters<Call> | undefined
  fire: (...args: Parameters<Call>) => Promise<void>
  retry: () => void
}

export function useApiStatus<Call extends ApiCall>({
  api,
  defaultParams,
  updateSilently = false,
  fireOnMount,
  onSuccess,
  onFail,
}: ApiStatusOptions<Call>): ApiStatus<Call> {
  type ReturnType = ApiStatus<Call>

  const [isLoading, setIsLoading] =
    useState<ReturnType["isLoading"]>(false)
  const [validationErrors, setValidationErrors] =
    useState<ReturnType["validationErrors"]>()
  const [errorMessage, setErrorMessage] =
    useState<ReturnType["errorMessage"]>()
  const [data, setData] = useState<ReturnType["data"]>()
  const [lastArgs, setLastArgs] = useState<Parameters<Call>>()

  const fire: ReturnType["fire"] = async (...args) => {
    setIsLoading(true)
    setLastArgs(args)
    setErrorMessage(undefined)
    setValidationErrors(undefined)
    if (!updateSilently) {
      setData(undefined)
    }
    try {
      const { data } = await api(...args)
      console.log(`api successful ${api.name}`)
      onSuccess && onSuccess({ result: data, args })
      setData(data)
    } catch (error: any) {
      setData(undefined)
      const { data, status } = error?.response || {}

      const message = data?.message
        ? data?.message
        : error.message.length < 40
        ? error.message
        : "Something Went Wrong!"

      onFail && onFail({ ...error, message })

      const errors: ValidationErrors =
        status == 422 ? data?.["errors"] : undefined
      setValidationErrors(errors)
      setErrorMessage(message)

      const errorLog =
        errors &&
        Object.values(errors)
          .map((arr) => arr.join(" | "))
          .join("\n")

      console.log(
        `api (${api.name}) failed with error: ${error} ${
          errorLog ? "\n" + errorLog : ""
        }`
      )
    }
    setIsLoading(false)
  }
  useEffect(() => {
    if (fireOnMount && defaultParams) {
      fire(...defaultParams)
    }
  }, [])

  return {
    isLoading,
    errorMessage,
    validationErrors,
    data,
    previousArguments: lastArgs,
    retry: () => lastArgs && fire(...lastArgs),
    fire,
  }
}
