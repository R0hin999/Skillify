import Image from "next/image";

export const BenefitGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 px-5 lg:px-20 py-10">
      <div className="outline outline-2 outline-black/50 hover:scale-[1.01] transition-all rounded-md shadow-md lg:col-span-2 px-4 lg:px-32 py-10">
        <div className="flex items-center gap-x-4 lg:gap-x-20">
          <Image
            src={"/benefit_1.svg"}
            alt="Benefit-1"
            width={200}
            height={200}
            objectFit="cover"
          ></Image>
          <div className="flex flex-col gap-y-5">
            <h2 className="text-2xl font-medium">Create an Engaging Course</h2>
            <p className="text-balance">
              Whether you&apos;ve been teaching for years or are teaching for
              the first time, you can make an engaging course. We&apos;ve
              compiled resources and best practices to help you get to the next
              level, no matter where you&apos;re starting.
            </p>
          </div>
        </div>
      </div>
      <div className=" outline outline-2 outline-black/50 hover:scale-[1.01] rounded-md shadow-md px-4  py-10">
        <div className="flex items-center gap-x-4 lg:gap-x-20">
          <Image
            src={"/benefit_2.svg"}
            alt="Benefit-1"
            width={200}
            height={200}
            objectFit="cover"
          ></Image>
          <div className="flex flex-col gap-y-5">
            <h2 className="text-2xl font-medium">Keep 100% of Your Earnings</h2>
            <p className="text-balance">
              Unlike other platforms, we believe that you deserve to keep all
              the money you earn. Our platform does not cut any fees from
              instructors, ensuring that you are fully rewarded for your hard
              work and dedication.
            </p>
          </div>
        </div>
      </div>
      <div className="outline outline-2 outline-black/50  hover:scale-[1.01] rounded-md shadow-md px-4 py-10">
        <div className="flex items-center gap-x-4 lg:gap-x-20">
          <Image
            src={"/benefit_3.svg"}
            alt="Benefit-1"
            width={200}
            height={200}
            objectFit="cover"
          ></Image>
          <div className="flex flex-col gap-y-5">
            <h2 className="text-2xl font-medium">Flexible and Easy-to-Use</h2>
            <p className="text-balance">
              Our user-friendly platform makes creating and managing your
              courses a breeze. Upload content, design interactive elements, and
              track your sales-all within a simple and intuitive interface. No
              technical expertise required.
            </p>
          </div>
        </div>
      </div>

      <div className="outline outline-2 outline-black/50 hover:scale-[1.01] rounded-md shadow-md lg:col-span-2 px-4 lg:px-32 py-14">
        <div className="flex items-center gap-x-4 lg:gap-x-20">
          <Image
            src={"/benefit_4.svg"}
            alt="Benefit-4"
            width={200}
            height={200}
            objectFit="cover"
          ></Image>
          <div className="flex flex-col gap-y-5">
            <h2 className="text-2xl font-medium">Reach a Global Audience</h2>
            <p className="text-balance">
              Our platform connects you with students from around the world.
              Share your knowledge and expertise with a diverse and expansive
              audience, making a global impact with your teaching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
