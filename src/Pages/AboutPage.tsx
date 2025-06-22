import me from '@/assets/me.jpg'; 

const AboutPage = () => {
    return (
        <>
            <section id="profile intro" className="flex flex-col items-center justify-center p-4">
                <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-lg mt-10">
                    <img
                    src={me}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    />
                
                </div> 
                    <p className="text-3xl font-bold mt-3">Kenny Charles U. Tabon</p>
            </section>

            <section className="flex justify-center py-6">
                <div className="flex flex-row items-center gap-2 max-w-3xl w-full px-4 text-center">
                    <span className="font-semibold whitespace-nowrap mr-10">About Me</span>
                    <p className="text-base text-gray-300 text-left">
                        Hello, my name is <span className="font-semibold text-white">Kenny</span>. I am currently working as a <span className="font-bold">Data Engineer</span>, with a strong focus on building scalable data solutions using <span className="text-red-300">Databricks</span>, <span className="text-sky-200">Apache Airflow</span>, and managing spatial data workflows.
                        <br /><br />
                        Outside of work, I enjoy staying active through <span className="italic">tennis</span> and <span className="italic">pickleball</span>. I also spend time playing video games as a way to unwind.
                        <br /><br />
                        On Sundays, I look forward to watching new episodes of my favorite anime series and attending church to reflect and reset for the upcoming week.
                    </p>
                </div>
            </section>



        </>

    )
}

export default AboutPage;