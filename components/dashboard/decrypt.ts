import { privateKey } from "@/lib/keys";
import { PaillierPrivateKey } from "../../algorithm/pallier";

export const HomomorphicDecrypt = (data: any) => {
    console.log("data", data);
    const pailierPrivateKey = new PaillierPrivateKey(privateKey.lambda, privateKey.mu, privateKey._p, privateKey._q, privateKey.publicKey);

    const voters = pailierPrivateKey.decrypt(data.data.voters);
    const candidates = pailierPrivateKey.decrypt(data.data.candidates);
    const elections = pailierPrivateKey.decrypt(data.data.elections);
    const positions = pailierPrivateKey.decrypt(data.data.positions);
    return {
    voters:voters.toString(),
    candidates:candidates.toString(),
    elections:elections.toString(),
    positions:positions.toString()
}
}