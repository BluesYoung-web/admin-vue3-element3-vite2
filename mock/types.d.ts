declare namespace Young {
  interface MockPluginConfig {
    viteEnv?: ImportMetaEnv;
  }

  interface ReturnData {
    status: number;
    msg: string;
    data: any;
  }

  type MockItem = (params: Record<string, any>) => ReturnData;
}
