import { FC } from "react";
import { Tag, Space, Progress, Flex } from "antd";
import Pokemon from "../interfaces/Pokemon.interface";

const PokemonDetail: FC<{ details: Pokemon; onClose: () => void }> = ({
  details,
  onClose,
}) => {
  return (
    <div>
      <span
        onClick={onClose}
        className="pokemon__details--close"
      >{`< Cerrar`}</span>
      <p className="pokemon__details--title">{details.name}</p>

      <p
        style={{
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Habilidades
      </p>

      <Space size={[0, 8]} wrap>
        {details.abilities.map(({ ability }) => (
          <Tag key={ability.url}>{ability.name}</Tag>
        ))}
      </Space>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <p className="pokemon__details--info">{details.height}</p>
          <span style={{ color: "gray" }}>Altura</span>
        </div>
        <div>
          <p className="pokemon__details--info">{details.weight}</p>
          <span style={{ color: "gray" }}>Peso</span>
        </div>
      </div>

      <p
        style={{
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Stats
      </p>

      <Flex vertical>
        {details.stats.map((stat) => (
          <div key={stat.stat.name}>
            <span style={{ display: "block", fontWeight: "bold" }}>
              {stat.stat.name}
            </span>
            <Progress percent={stat.base_stat} />
          </div>
        ))}
      </Flex>
    </div>
  );
};

export default PokemonDetail;
