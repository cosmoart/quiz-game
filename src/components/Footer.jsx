import { BsGithub } from "react-icons/bs";
import settings from "../assets/settings.svg";
import Image from 'next/image';

export default function Footer(props) {
	return (
		<footer className="px-3 py-8 mt-auto text-gray-500 transition-colors duration-200 bg-white dark:bg-gray-800 text-2 dark:text-gray-200">
			<div className="flex flex-col">
				<div className="h-px mx-auto rounded-full md:hidden mt-7 w-11">
				</div>
				<div className="flex flex-col mt-4 md:mt-0 md:flex-row">
					<nav className="flex flex-col items-center justify-center flex-1 border-gray-100 md:items-end md:border-r md:pr-5">
						<ul>
							<li>
								<a aria-current="page" href="#" className="hover:text-gray-700 dark:hover:text-white">
									Components
								</a>
							</li>
							<li>
								<a aria-current="page" href="#" className="hover:text-gray-700 dark:hover:text-white">
									Contacts
								</a>
							</li>
							<li>
								<a aria-current="page" href="#" className="hover:text-gray-700 dark:hover:text-white">
									Customization
								</a>
							</li>
						</ul>
					</nav>
					<div className="h-px mx-auto mt-4 rounded-full md:hidden w-11">
					</div>
					<div className="flex items-center justify-center flex-1 mt-4 border-gray-100 md:mt-0 md:border-r">
						<a className="hover:text-primary-gray-20" target="_blank" rel="noopener noreferrer" href="https://github.com/cosmoart/quiz">
							<span className="sr-only">
								View on GitHub
							</span>
							<BsGithub className="w-6 h-6 text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" />
						</a>
					</div>
					<div className="h-px mx-auto mt-4 rounded-full md:hidden w-11 ">
					</div>
					<div className="flex flex-col items-center justify-center flex-1 mt-7 md:mt-0 md:items-start md:pl-5">
						<span className="">
							MIT licence
						</span>
						<span className="mt-7 md:mt-1">
							Created by <a className="underline hover:text-primary-gray-20" target="_blank" rel="noopener noreferrer" href="https://github.com/cosmoart">
								Cosmo
							</a>
						</span>
					</div>
				</div>
			</div>
		</footer>
	)
}