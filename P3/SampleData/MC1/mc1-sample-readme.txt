There will be one (CSV) file spanning the entire length of the simulation, containing (categorical) individual reports of shaking/damage by neighborhood over time.

mc1-sample-rumble.csv:
    - time: timestamp in the format YYYY-MM-DD hh:mm:ss (may be in order, may not; depends on how good the Rumble developers were...)
    - location: id of neighborhood where person reporting is feeling the shaking and/or seeing the damage
    - {shake_intensity, sewer_and_water, power, roads_and_bridges, medical, buildings}: reported categorical value of how violent the shaking was/how bad the damage was (1 - low, 10 - highest; missing data allowed)
