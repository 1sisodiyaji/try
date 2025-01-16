import Link from "next/link";
export default function ProjectsPage() {
  return (
    <>
      <section className=''>
        <div className='flex flex-col lg:flex-row justify-between lg:p-6 lg:px-10'>
          <div className='px-8 lg:basis-2/5 py-16 lg:pl-0'>
            <h1 className='text-4xl leading-10 md:text-5xl max-w-lg md:!leading-[3.5rem] tracking-wide'>
              Current Projects
            </h1>
            <p className='mt-6 text-xl text-grey tracking-wide'>
              Harness the potential of your innovative spirit.
            </p>
            <div className='flex flex-wrap items-start gap-6 mt-10'>
              <Link
                href='#current-projects'
                className='text-center text-white tracking-widest capitalize rounded-full px-8 py-3'
              >
                find projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
