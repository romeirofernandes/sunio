const members = [
    {
        name: 'Romeiro',
        role: 'Co-Founder',
        avatar: '/romeiro.jpeg',
        link: 'https://romeirofernandes.tech',
    },
    {
        name: 'Russel',
        role: 'Co-Founder',
        avatar: '/russel.jpg',
        link: 'https://russeldanielpaul.tech',
    },
]

export default function TeamSection() {
    return (
        <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-6xl border-t px-6">
                <span
                    className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 py-1 dark:bg-zinc-800">Team</span>
                <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
                    <div className="sm:w-2/5">
                        <h2 className="text-3xl font-bold sm:text-4xl">Meet the Founders</h2>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <p>Two passionate engineers dedicated to revolutionizing investment management through AI-powered technology.</p>
                    </div>
                </div>
                <div className="mt-12 md:mt-24">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-2">
                        {members.map((member, index) => (
                            <div key={index} className="group overflow-hidden">
                                <img
                                    className="h-96 w-full rounded-md object-contain object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                                    src={member.avatar}
                                    alt="team member"
                                    width="826"
                                    height="1239" />
                                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                    <div className="flex justify-between">
                                        <h3
                                            className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">{member.name}</h3>
                                        <span className="text-xs">_0{index + 1}</span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span
                                            className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">{member.role}</span>
                                        <a
                                            href={member.link}
                                            className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100">
                                            {' '}
                                            Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
