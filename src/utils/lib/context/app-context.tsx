import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({} as any);

export function AppWrapper({ children, values }: any) {
  const [area, setArea] = useState<any>([]);
  const [selectedArea, setSelectedArea] = useState<any>({});

  const [zones, setZones] = useState<any>([]);
  const [selectedZones, setSelectedZones] = useState<any>([]);

  const [aisle, setAisle] = useState<any>([]);
  const [selectedAisle, setSelectedAisle] = useState<any[]>([]);

  const [saveButtonIsDisabled, setSaveButtonIsDisabled] = useState<boolean>(true)

  const [isLoadingUpdateProdLocation, setIsLoadingUpdateProdLocation] = useState<boolean>(false)

  const sharedState = {
    area,
    setArea,
    selectedArea,
    setSelectedArea,
    zones,
    setZones,
    selectedZones,
    setSelectedZones,
    aisle,
    setAisle,
    selectedAisle,
    setSelectedAisle,
    saveButtonIsDisabled,
    setSaveButtonIsDisabled,
    isLoadingUpdateProdLocation, 
    setIsLoadingUpdateProdLocation
  };

  return (
    <AppContext.Provider value={{ ...sharedState, ...values }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
