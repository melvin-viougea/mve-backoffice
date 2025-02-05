import AuthForm from '@/components/form/AuthForm'

const SignIn = async () => {
  return (
    <section className="flex items-center justify-center size-full max-sm:px-6">
      <AuthForm type="sign-in"/>
    </section>
  )
}

export default SignIn