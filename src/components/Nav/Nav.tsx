import Link from 'next/link';

import Container from '@/components/Container';
import UploadButton from '@/components/UploadButton'


const Nav = () => {
  return (
    <nav className="flex items-center h-16 border border-zinc-200">
      <Container className="flex gap-6 items-center flex-row">
        <p className="w-40 flex-grow-0 mb-0">
          <Link href="/">
            <svg className="max-w-full h-auto" xmlns="http://www.w3.org/2000/svg" width="642" height="125" fill="none" viewBox="0 0 642 125">
              <path fill="#3448C5" d="M205.811 38.968a21.983 21.983 0 0117.384 8.585.888.888 0 00.968.314.888.888 0 00.314-.173l7.32-5.83a.91.91 0 00.141-1.282 33.345 33.345 0 00-26.422-12.98c-19.114 0-34.614 16.466-34.614 36.712 0 20.246 15.551 36.712 34.614 36.712a33.156 33.156 0 0026.41-12.968.904.904 0 00.201-.674.896.896 0 00-.355-.608l-7.308-5.766a.905.905 0 00-1.009-.088.916.916 0 00-.273.23 22.127 22.127 0 01-17.371 8.546c-13.063 0-23.281-11.148-23.281-25.359 0-14.21 10.218-25.371 23.281-25.371zm35.563-13.455h9.179a.91.91 0 01.91.91V99.18a.894.894 0 01-.897.897h-9.179a.91.91 0 01-.91-.91V26.424a.897.897 0 01.897-.91zm41.37 25.167c-12.166 0-24.473 8.61-24.473 25.077 0 14.466 10.525 25.384 24.473 25.384 13.948 0 24.576-10.918 24.576-25.384 0-14.467-10.564-25.077-24.576-25.077zm13.5 25.077c0 8.354-5.808 14.659-13.5 14.659s-13.384-6.305-13.384-14.66c0-8.354 5.756-14.351 13.384-14.351s13.5 6.163 13.5 14.352zm60.548-24.027h-9.179a.895.895 0 00-.91.898v24.346c0 9.508-6.564 12.878-12.192 12.878-4.974 0-9.986-3.755-9.986-12.148V52.628a.896.896 0 00-.911-.898h-9.179a.896.896 0 00-.897.898v26.268c0 14.416 6.525 22.347 18.384 22.347 4.307 0 11.281-2.473 13.897-7.931l.884.179v5.69a.909.909 0 00.91.909h9.179a.91.91 0 00.911-.91V52.627a.896.896 0 00-.911-.897zm56.37-26.217h-9.192a.893.893 0 00-.639.267.901.901 0 00-.258.643v32.522l-.564-.897c-2.795-4.498-8.808-7.407-15.32-7.407-11.231 0-22.589 8.65-22.589 25.18 0 14.415 9.756 25.281 22.678 25.281 4.923 0 11.859-1.973 15.231-7.508l.564-.923v6.51a.897.897 0 00.897.909h9.192a.89.89 0 00.639-.267.901.901 0 00.258-.643V26.423a.897.897 0 00-.897-.91zm-10.256 50.244a14.1 14.1 0 01-3.851 10.152 14.112 14.112 0 01-9.93 4.404c-7.513 0-13.397-6.407-13.397-14.556 0-8.15 5.884-14.352 13.397-14.352a14.098 14.098 0 0113.743 14.352h.038zm24.012-24.027h9.179a.9.9 0 01.897.898V99.18a.897.897 0 01-.897.897h-9.179a.91.91 0 01-.91-.91v-46.54a.91.91 0 01.91-.897zm4.628-24.743a7.142 7.142 0 00-7.295 7.137 7.227 7.227 0 007.295 7.15 7.105 7.105 0 007.192-7.15 7.024 7.024 0 00-7.192-7.137zm43.255 23.693c-4.026 0-11.179 2.165-13.91 7.932l-.885-.18v-5.805a.895.895 0 00-.91-.897h-9.179a.9.9 0 00-.897.898V99.18a.897.897 0 00.897.91h9.179a.912.912 0 00.91-.91V74.834c0-9.431 6.564-12.814 12.192-12.814 4.974 0 9.987 3.729 9.987 12.045V99.18a.909.909 0 00.91.91h9.205a.912.912 0 00.91-.91V72.925c-.026-14.34-6.564-22.245-18.409-22.245zm73.24 1.05h-9.179a.895.895 0 00-.91.898v6.406l-.551-.896c-2.808-4.498-8.821-7.407-15.384-7.407-11.218 0-22.589 8.65-22.589 25.18 0 14.415 9.756 25.281 22.691 25.281 4.91 0 11.846-1.973 15.23-7.509l.552-.922v6.42a.912.912 0 00.91.909h9.179a.89.89 0 00.639-.267.901.901 0 00.258-.643V52.627a.895.895 0 00-.846-.897zm-10.256 24.027a14.083 14.083 0 01-8.402 13.36 14.101 14.101 0 01-5.418 1.196c-7.512 0-13.384-6.407-13.384-14.556 0-8.15 5.872-14.352 13.384-14.352a14.103 14.103 0 0113.795 14.352h.025zm52.139-23.86a17.518 17.518 0 00-6.589-1.281c-6.103 0-10.538 3.652-12.82 10.571l-.821-.115v-8.445a.895.895 0 00-.91-.897h-9.179a.895.895 0 00-.91.898V99.18a.912.912 0 00.91.91h9.282a.898.898 0 00.897-.91V83.291c0-18.964 7.577-21.783 12.102-21.783 1.909.004 3.798.397 5.551 1.153a.923.923 0 00.782 0 .898.898 0 00.462-.615l1.82-9.111a.91.91 0 00-.577-1.038zm50.934.23a.885.885 0 00-.756-.397h-9.885a.924.924 0 00-.846.577L617.41 83.291l-12.076-30.984a.919.919 0 00-.846-.577h-10.077a.885.885 0 00-.743.398.9.9 0 00-.09.846l17.948 44.054-9.91 25.743a.91.91 0 00.846 1.281h9.615a.886.886 0 00.833-.577l28.025-70.476a.888.888 0 00-.077-.871zM125.532 36.022a51.737 51.737 0 00-18.627-25.946A51.784 51.784 0 0076.585 0a50.811 50.811 0 00-26.233 7.12A50.78 50.78 0 0031.55 26.743 38.311 38.311 0 0010.544 38.05 38.272 38.272 0 004.81 83.007a38.3 38.3 0 0017.496 16.212l.961.435h.064V88.763a28.565 28.565 0 01-11.38-13.242 28.55 28.55 0 017.323-32.428 28.582 28.582 0 0115.967-7.072l2.692-.282 1.18-2.422a41.205 41.205 0 0115.292-17.268 41.23 41.23 0 0122.18-6.348 41.932 41.932 0 0125.74 9.06 41.901 41.901 0 0114.708 22.975l.923 3.664h3.846a23.761 23.761 0 0116.452 7.093 23.737 23.737 0 016.816 16.562c0 9.034-5.218 16.427-14.102 20.169v10.328l.641-.205c14.282-4.677 23.153-16.286 23.153-30.292a33.551 33.551 0 00-8.424-21.99 33.58 33.58 0 00-20.806-11.044z"></path>
              <path fill="#3448C5" d="M57.792 98.399l2.128 2.127a.424.424 0 01-.064.644.422.422 0 01-.23.073H42.83a7.687 7.687 0 01-7.692-7.688V60.957a.423.423 0 00-.423-.423h-3.59a.423.423 0 01-.307-.718l14.256-14.249a.421.421 0 01.602 0l14.243 14.25a.423.423 0 01-.294.717h-3.641a.436.436 0 00-.436.423V92.99a7.687 7.687 0 002.243 5.408zm31.5 0l2.14 2.127a.42.42 0 01-.072.649.426.426 0 01-.236.068H74.37a7.687 7.687 0 01-7.692-7.688v-24.36a.436.436 0 00-.424-.435h-3.627a.423.423 0 01-.295-.717l14.243-14.224a.423.423 0 01.602 0l14.256 14.198a.423.423 0 01-.308.718h-3.64a.436.436 0 00-.424.435v23.821a7.686 7.686 0 002.231 5.408zm31.511 0l2.128 2.127a.43.43 0 01.112.214.431.431 0 01-.176.43.427.427 0 01-.231.073h-16.807a7.686 7.686 0 01-7.692-7.688V77.371a.423.423 0 00-.423-.423h-3.59a.423.423 0 01-.295-.73l14.256-14.236a.405.405 0 01.295-.125.407.407 0 01.295.125l14.256 14.236a.428.428 0 01.102.466.423.423 0 01-.397.264h-3.654a.423.423 0 00-.423.423v15.62a7.686 7.686 0 002.244 5.408z"></path>
            </svg>
          </Link>
        </p>
        <ul className="flex flex-grow justify-end gap-6 m-0">
          <li>
            <UploadButton/>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default Nav;