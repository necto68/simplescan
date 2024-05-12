import { NavBar } from "@/components/NavBar";
import { FormEvent } from "react";
import { chainConfigs } from "@/constants/chainConfigs";
import { useRouter } from "next/router";

export default function Home() {
  const route = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const chainId = data.get("chainId");
    const hash = data.get("hash");

    if (!chainId || !hash) {
      return;
    }

    const page = hash.toString().length === 42 ? "address" : "tx";

    route.push(`/${page}/${chainId}/${hash}`);
  };

  return (
    <>
      <NavBar />
      <main className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Select Chain
            <select name="chainId" required>
              {chainConfigs.map(({ chainId, title }) => (
                <option key={chainId} value={chainId}>
                  {title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Address or Transaction Hash
            <input
              name="hash"
              type="input"
              placeholder="Enter Address or Transaction Hash"
              required
              pattern="0x[a-fA-F0-9]{40}|0x[a-fA-F0-9]{64}"
            />
          </label>
          <input type="submit" value="Search" />
        </form>
        <p>
          <small>
            Example Mainnet Address: 0x0affb0a96fbefaa97dce488dfd97512346cf3ab8
          </small>
        </p>
        <p>
          <small>
            Example Polygon Address: 0xbf94d2948b3ec270e9134c9685d7cd700ab6818a
          </small>
        </p>
        <p>
          <small>
            Example Mainnet Transaction Hash:
            0x258c800c136403d40d58c09def1e712e342bad73cdf7532cb4419d07de6ba06c
          </small>
        </p>
        <p>
          <small>
            Example Polygon Transaction Hash:
            0xb76d61e9109434f29ed3d9400add11974567110e7e83df713df4f831150e27af
          </small>
        </p>
      </main>
    </>
  );
}
