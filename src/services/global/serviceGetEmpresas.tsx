import axios from "axios";

export const getEmpresas = async (
  ): Promise<string[]> => {
    try {
      const { data } = await axios.get(
        " http://192.168.15.161:8000/empresas",
      );
      return data;
    } catch (err: any) {
      if (err.response) {
        throw new Error(err.response.data.detail || "Erro na API");
      } else {
        throw new Error("Erro de rede ou API está fora");
      }
    }
  };
  