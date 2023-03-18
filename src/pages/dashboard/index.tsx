import Link from "next/link";

export default function Dashboard(){
    return(
        <div>
            <h1 className="text-4xl">dashboard</h1>
            <div>
                <ul>
                    <li>
                        <Link href={`/dashboard/pages`}>Pages</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}