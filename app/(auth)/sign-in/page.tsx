import AuthForm from '@/components/AuthForm'

const SignIn = async () => {
  console.log(process.env.NEXT_PUBLIC_HOST)
  return (
    <section className="flex items-center justify-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  )
}

export default SignIn