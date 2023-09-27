import { useNavigate, useRouteError } from "react-router-dom";
import MainNavigation from "../MainNavigation";
import PageContent from "../Error/PageContent";
import SideBarNavigation from "../SideBarNavigation";
import { useEffect, useState } from "react";
import { ModalControls } from "../../components/NavigationCPP/JoinUs";
import LoginModal from "../../components/SigninSignup/LoginModal";

interface ErrorPageProps {
  status: number;
  data: {
    message: string;
  };
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorPageProps;
  const [showModal, setShowModal] = useState<boolean>(false);
  const controlModal = (options?: ModalControls) => {
    options === "show" ? setShowModal(true) : setShowModal(false);
  };

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  if (error.status === 403) {
    title = `Access denied!`;
    message = error.data.message;
  }

  const navigate = useNavigate();

  useEffect(() => {
    let redirect;
    if (error.status === 404) {
      redirect = setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    return () => {
      clearTimeout(redirect);
    };
  }, [error, navigate]);

  return (
    <>
      <MainNavigation />
      <main className="grid grid-cols-2">
        <SideBarNavigation />
        <PageContent title={title}>
          <>
            <p>{message}</p>
            {error.status === 404 ? (
              <p className="text-white">
                Redirecting you to the{" "}
                <span
                  onClick={() => navigate("/")}
                  className="underline underline-offset-1 text-indigo-400"
                >
                  home page
                </span>
              </p>
            ) : (
              error.status === 403 && (
                <>
                  <p className="text-center text-white whitespace-nowrap text-lg">
                    You aren't registered, Do you want to{" "}
                    <span
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className="text-indigo-500 underline underline-offset-1 cursor-pointer"
                    >
                      sign in{" "}
                    </span>
                    ?
                  </p>
                  {showModal && (
                    <LoginModal controlModal={controlModal}></LoginModal>
                  )}
                </>
              )
            )}
          </>
        </PageContent>
      </main>
    </>
  );
};

export default ErrorPage;
