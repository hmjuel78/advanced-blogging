import { useEffect } from "react"

function useOutsideClick(
    ref,
    callback,
    options = { onOutsideClickHide: true },
) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (options?.onOutsideClickHide) {
                    callback()
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])
}

export default useOutsideClick