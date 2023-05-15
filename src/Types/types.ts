export interface Article {
  filter(arg0: (article: any) => any): unknown;
  data: any;
  
    name: any;

      id: number;
      attributes: {
        Rubrik: string;
        Brodtext: string;
        Ingress: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        kategori: string;
        toppnyhet: boolean;
        Bild: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              caption: string | null;
              width: number;
              height: number;
              formats: {
                thumbnail: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  path: string | null;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
                small: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  path: string | null;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
              };
              hash: string;
              ext: string;
              mime: string;
              size: number;
              url: string;
              previewUrl: string | null;
              provider: string;
              provider_metadata: any;
              createdAt: string;
              updatedAt: string;
            };
          }[];
        };
        skribent: {
          data: {
            id: number;
            attributes: {
              createdAt: string;
              updatedAt: string;
            };
          };
        };
      };
  }
  