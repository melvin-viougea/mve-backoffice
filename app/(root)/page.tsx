import HeaderBox from '@/components/HeaderBox'
import {getLoggedInUser} from '@/lib/actions/user.actions';
import {SearchParamProps} from "@/types";

const Home = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <HeaderBox
            type="greeting"
            title="Tableau de bord"
            user={loggedIn?.firstname || 'Guest'}
            subtext="Welcome"
          />
        </header>
      </div>
    </section>
  )
}

export default Home