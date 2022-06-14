import { Meta, Story } from "@storybook/react";
import {
  ArrowIcon,
  BankIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleIcon,
  ClipIcon,
  DocumentIcon,
  DownIcon,
  DownloadIcon,
  EnvelopIcon,
  ExclamationIcon,
  EyeIcon,
  FaqIcon,
  FilterIcon,
  FirstIcon,
  FlameIcon,
  HomeIcon,
  IdentityIcon,
  IncomesIcon,
  GrinnIcon,
  GrinndocLogoIcon,
  KeyIcon,
  LeftIcon,
  LogoIcon,
  MiniAgendaIcon,
  PenIcon,
  PhotoIcon,
  PlusIcon,
  PrintIcon,
  PropositionIcon,
  QuestionIcon,
  ReportIcon,
  RightIcon,
  RoundedIcon,
  SecondIcon,
  StarIcon,
  ThirdIcon,
  TodoIcon,
  UpIcon,
  UploadIcon,
  WaitIcon,
  WheelIcon,
  XIcon,
} from "@grinn/icons";

const background = "../public/background";
const backgroundpro2 = "../public/backgroundpro2.svg";

export default {
  title: "Design System",
} as Meta;
const Template: Story = () => {
  return (
    <div>
      <h1># Colors</h1>

      <h2 className="mb-4">
        <span className="text-secondary-500">Variations</span>{" "}
        <span className="text-accent-700">of</span>{" "}
        <span className="text-primary-500">grinn</span>{" "}
        <span className="text-primary-50">Colors</span>
        <span className=" text-danger"> !</span>
      </h2>

      {/*       <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <p>test HSL</p>
          <p>70%</p>
          <div className="items-end w-12 h-12 bg-primary-55 rounded-xl"></div>
        </div>
        <div className="flex items-center space-x-2">
          <p>test HSL</p>
          <p>80%</p>
          <div className="items-end w-12 h-12 bg-primary-60 rounded-xl"></div>
        </div>
        <div className="flex items-center space-x-2">
          <p>test HSL</p>
          <p>90%</p>
          <div className="items-end w-12 h-12 bg-primary-65 rounded-xl"></div>
        </div>
      </div> */}

      <section className="w-full mt-10 mb-8">
        <h2 className="text-sm text-left">primary color</h2>
        <div className="w-full ">
          <div className="flex flex-col justify-around">
            <div className="flex justify-around">
              <p>primary-50</p>
              <p>#4d75ef</p>
              <div className="w-12 h-12 bg-primary-50 rounded-xl"></div>
            </div>

            <div className="flex justify-around">
              <p>primary-100</p>
              <p>#436be5</p>
              <div className="w-12 h-12 bg-primary-100 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>primary-200</p>
              <p>#3961db</p>
              <div className="w-12 h-12 bg-primary-200 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>primary-400</p>
              <p>#2f57d1</p>
              <div className="w-12 h-12 bg-primary-400 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>primary-400</p>
              <p>#254dc7</p>
              <div className="w-12 h-12 bg-primary-400 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>primary-500</p>
              <p>#1b43bd</p>
              <div className="w-12 h-12 bg-primary-500 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>primary-600</p>
              <p>#1139b3</p>
              <div className="w-12 h-12 bg-primary-600 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>primary-700</p>
              <p>#072fa9</p>
              <div className="w-12 h-12 bg-primary-700 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>primary-800</p>
              <p>#00259f</p>
              <div className="w-12 h-12 bg-primary-800 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>primary-900</p>
              <p>#001b95</p>
              <div className="w-12 h-12 bg-primary-900 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mt-10 mb-8">
        <h2 className="text-sm text-left">secondary color</h2>
        <div className="w-full">
          <div className="flex flex-col">
            <div className="flex justify-around">
              <p>secondary-50</p>
              <p>#ffbaba</p>
              <div className="w-12 h-12 bg-secondary-50 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>secondary-100</p>
              <p>#ffb0b0</p>
              <div className="w-12 h-12 bg-secondary-100 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>secondary-200</p>
              <p>#ffa6a6</p>
              <div className="w-12 h-12 bg-secondary-200 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>secondary-300</p>
              <p>#f89c9c</p>
              <div className="w-12 h-12 bg-secondary-300 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>secondary-400</p>
              <p>#75ffe6</p>
              <div className="w-12 h-12 bg-secondary-400 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>secondary-500</p>
              <p>#6bffdc</p>
              <div className="w-12 h-12 bg-secondary-500 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>secondary-600</p>
              <p>#da7e7e</p>
              <div className="w-12 h-12 bg-secondary-600 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>secondary-700</p>
              <p>#d07474</p>
              <div className="w-12 h-12 bg-secondary-700 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>secondary-800</p>
              <p>#c66a6a</p>
              <div className="w-12 h-12 bg-secondary-800 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>secondary-900</p>
              <p>#bc6060</p>
              <div className="w-12 h-12 bg-secondary-900 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mt-10 mb-8">
        <h2 className="text-sm text-left">accent color</h2>
        <div className="w-full">
          <div className="flex flex-col">
            <div className="flex justify-around">
              <p>accent-50</p>
              <p>#9dffff</p>
              <div className="w-12 h-12 bg-accent-50 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>accent-100</p>
              <p>#93ffff</p>
              <div className="w-12 h-12 bg-accent-100 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>accent-200</p>
              <p>#89fffa</p>
              <div className="w-12 h-12 bg-accent-200 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>accent-300</p>
              <p>#7ffff0</p>
              <div className="w-12 h-12 bg-accent-300 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>accent-400</p>
              <p>#ee9292</p>
              <div className="w-12 h-12 bg-accent-400 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>accent-500</p>
              <p>#e48888</p>
              <div className="w-12 h-12 bg-accent-500 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>accent-600</p>
              <p>#61f5d2</p>
              <div className="w-12 h-12 bg-accent-600 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>accent-700</p>
              <p>#57ebc8</p>
              <div className="w-12 h-12 bg-accent-700 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>accent-800</p>
              <p>#4de1be</p>
              <div className="w-12 h-12 bg-accent-800 rounded-xl"></div>
            </div>
            <div className="flex justify-around">
              <p>accent-900</p>
              <p>#43d7b4</p>
              <div className="w-12 h-12 bg-accent-900 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full mt-10 mb-8">
        <h2 className="text-sm">danger color</h2>
        <div className="w-full">
          <div className="flex flex-col">
            <div className="flex justify-around">
              <p>danger</p>
              <p>#de4343</p>
              <div className="w-12 h-12 bg-danger rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <h1># Typography - Apfel Grotezk</h1>

      <section className="w-full mt-10 mb-8">
        <div className="flex flex-col">
          <div className="flex justify-around">
            <p className="font-bold font-ApfelGrotezk">
              grinn votre plateforme de speed dating avec les banques
            </p>
            <p className="font-bold font-Convergence">700</p>
          </div>
          <div className="flex justify-around">
            <p className="font-normal font-ApfelGrotezk">
              grinn votre plateforme de speed dating avec les banques
            </p>
            <p className="font-normal font-ApfelGrotesk">400</p>
          </div>
        </div>
      </section>

      <h1># Assets</h1>

      <section className="flex flex-col w-full mt-10 mb-8">
        <div className="grid w-screen grid-cols-4 gap-8 place-content-center ">
          <ArrowIcon width={40} height={40} color="#4de1be" />
          <BankIcon width={40} height={40} color={"#5F92CD"} />
          <BookOpenIcon width={40} height={40} color={"#5F92CD"} />
          <CalendarIcon width={40} height={40} color={"#EA86C2"} />
          <CheckCircleIcon width={40} height={40} />
          <CheckIcon width={40} height={40} />
          <CircleIcon width={40} height={40} />
          <ClipIcon width={40} height={40} color={"#FFA228"} />
          <DocumentIcon width={40} height={40} color={"#5F92CD"} />
          <DownIcon width={40} height={40} />
          <DownloadIcon width={40} height={40} color={"#1B43BD"} />
          <EnvelopIcon width={40} height={40} color={"#BAC0C7"} />
          <ExclamationIcon width={40} height={40} color={"#de4343"} />
          <EyeIcon width={40} height={40} color="#4de1be" />
          <FaqIcon width={40} height={40} />
          <FilterIcon width={40} height={40} color={"#1B43BD"} />
          <FirstIcon width={40} height={40} />
          <FlameIcon width={40} height={40} color={"#E48888"} />
          <HomeIcon width={40} height={40} color={"#1B43BD"} />
          <IdentityIcon width={40} height={40} />
          <IncomesIcon width={40} height={40} />
          <GrinndocLogoIcon width={40} height={40} />
          <KeyIcon width={40} height={40} color={"#5F92CD"} />
          <LeftIcon width={40} height={40} />
          <LogoIcon width={40} height={40} color={"#1B43BD"} />
          <MiniAgendaIcon width={40} height={40} color={"#EA86C2"} />
          <PenIcon width={40} height={40} color={"#1B43BD"} />
          <PhotoIcon width={40} height={40} />
          <PlusIcon width={40} height={40} />
          <PrintIcon width={40} height={40} color={"#1B43BD"} />
          <PropositionIcon width={40} height={40} color={"#E48888"} />
          <QuestionIcon width={40} height={40} color={"#BAC0C7"} />
          <ReportIcon width={40} height={40} color={"#5F92CD"} />
          <RightIcon width={40} height={40} />
          <RoundedIcon width={40} height={40} color="#4de1be" />
          <SecondIcon width={40} height={40} />
          <StarIcon width={40} height={40} color={"#FFA51F"} />
          <ThirdIcon width={40} height={40} />
          <TodoIcon width={40} height={40} color={"#E48888"} />
          <UpIcon width={40} height={40} />
          <UploadIcon width={40} height={40} color={"#1B43BD"} />
          <WaitIcon width={40} height={40} color={"#FFA228"} />
          <WheelIcon width={40} height={40} color={"#BAC0C7"} />
          <XIcon width={40} height={40} />
        </div>
        <div className="flex flex-col w-full">
          <img
            className="object-cover mb-5"
            src={background}
            alt="background"
          />
          <img
            className="object-cover mb-5"
            src={backgroundpro2}
            alt="background2"
          />
        </div>
      </section>
    </div>
  );
};

export const Branding = Template.bind({});
