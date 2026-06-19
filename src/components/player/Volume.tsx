import { useEffect } from "react";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Slider } from "../Slider";
import {
  VolumeMax,
  VolumeMedium,
  VolumeMin,
  VolumeSilence,
} from "../../icons/Icons";

export const Volume = () => {
  const { sound, changeVolume, setVolume, volume } = usePlayerStore();

  const handleChange = (value) => {
    const newVolume = value / 100;
    setVolume(newVolume);
    changeVolume(newVolume);
  };

  useEffect(() => {
    if (sound !== null) {
      setVolume(sound.volume());
    }
  }, [sound]);
  return (
    <div className="flex items-center gap-1">
      <button type="button" className="text-xl text-gray-400 hover:text-white">
        {volume <= 0 ? (
          <VolumeSilence />
        ) : volume < 0.3 ? (
          <VolumeMin />
        ) : volume < 0.7 ? (
          <VolumeMedium />
        ) : (
          <VolumeMax />
        )}
      </button>
      <Slider
        className="w-[95px] cursor-pointer"
        defaultValue={[volume]}
        value={[volume * 100]}
        max={100}
        min={0}
        onValueChange={handleChange}
      />
    </div>
  );
};
