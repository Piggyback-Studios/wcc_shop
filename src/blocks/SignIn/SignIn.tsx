import ContentContainer from "@/src/components/common/ContentContainer";
import AdminSignInForm from "@/src/components/AdminSignInForm";

const SignIn = () => {
  return (
    <section>
      <ContentContainer>
        <h1>Sign In</h1>
        <AdminSignInForm />
      </ContentContainer>
    </section>
  );
};

export default SignIn;
