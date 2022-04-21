
function generateSeed(string)
{
    hash = 0x811C9DC5;
    const prime = 0x01000193;
    for(const char of string)
    {
        hash *= prime;
        hash ^= char;
    }
    return hash;
}

function createMap(level, seed)
{
    map.w = 20;
    map.h = 20;
}